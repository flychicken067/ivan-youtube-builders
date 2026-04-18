#!/usr/bin/env node
/**
 * auto-digest.js — daily digest with Gemini video moment analysis
 * Fetches YouTube videos, asks Gemini to find the most intense moment,
 * builds Chinese digest, pushes to Telegram.
 */

const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CONFIG_DIR = path.join(os.homedir(), '.ivan-youtube-builders');
const SKILL_DIR = path.dirname(__dirname);

function loadConfig() {
  const p = path.join(CONFIG_DIR, 'config.json');
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {};
}

function loadEnv() {
  const p = path.join(CONFIG_DIR, '.env');
  if (!fs.existsSync(p)) return {};
  const env = {};
  fs.readFileSync(p, 'utf8').split('\n').forEach(line => {
    const m = line.match(/^([A-Z_]+)=(.+)$/);
    if (m) env[m[1]] = m[2].trim();
  });
  return env;
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(d));
    }).on('error', reject);
  });
}

function parseRSS(xml) {
  const videos = [];
  const re = /<entry>([\s\S]*?)<\/entry>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const e = m[1];
    const title = (e.match(/<title>(.*?)<\/title>/) || [])[1] || '';
    const videoId = (e.match(/<yt:videoId>(.*?)<\/yt:videoId>/) || [])[1] || '';
    const published = (e.match(/<published>(.*?)<\/published>/) || [])[1] || '';
    if (videoId) videos.push({
      videoId,
      title: title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
      url: `https://www.youtube.com/watch?v=${videoId}`,
      publishedAt: published,
    });
  }
  return videos;
}

function getTranscript(url) {
  try {
    execSync(
      `yt-dlp --write-auto-sub --sub-lang en --skip-download --sub-format vtt -o /tmp/yt-auto "${url}" 2>/dev/null`,
      { timeout: 30000 }
    );
    const raw = fs.readFileSync('/tmp/yt-auto.en.vtt', 'utf8');
    const seen = new Set();
    return raw
      .replace(/WEBVTT[\s\S]*?\n\n/, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\d{2}:\d{2}:\d{2}[.,]\d{3}\s*-->\s*[\s\S]*?\n/g, '')
      .replace(/^\d+\s*$/gm, '')
      .split('\n').map(l => l.trim())
      .filter(l => l && !seen.has(l) && seen.add(l))
      .join(' ').slice(0, 2000);
  } catch { return null; }
}

function callGemini(apiKey, prompt, videoUrl) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      contents: [{
        parts: [
          { fileData: { mimeType: 'video/mp4', fileUri: videoUrl } },
          { text: prompt }
        ]
      }],
      generationConfig: {
        maxOutputTokens: 500,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    const req = https.request({
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, res => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const r = JSON.parse(d);
          if (r.candidates) resolve(r.candidates[0].content.parts[0].text);
          else reject(new Error(r.error?.message || 'Gemini error'));
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body); req.end();
  });
}

async function getPeakMoment(videoUrl, apiKey) {
  if (!apiKey) return null;
  try {
    const prompt = `你是一个内容分析师。在这个视频里找出最让人震惊、最激烈或概念最冲突的单一时刻。
用中文回答，格式严格如下（3句话以内）：
⏱ [MM:SS] 画面：[精确描述那一刻屏幕上出现的内容]
💥 为什么是最强时刻：[一句话说明]`;
    const result = await callGemini(apiKey, prompt, videoUrl);
    return result.trim();
  } catch (e) {
    process.stderr.write(`[Gemini] ${e.message}\n`);
    return null;
  }
}

function buildDigest(videos, totalChannels) {
  const dateStr = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Shanghai'
  });

  let text = `📺 <b>YouTube Builder 日报 · ${dateStr}</b>\n`;
  text += `${totalChannels}个频道扫描 · ${videos.length}条新视频\n`;
  text += `━━━━━━━━━━━━━━━━━━━\n\n`;

  for (const v of videos) {
    text += `<b>${v.channel}</b>\n`;
    text += `${v.title}\n\n`;

    if (v.transcript) {
      // Use first ~180 chars as content hook
      const hook = v.transcript.slice(0, 180).replace(/\s+$/, '') + '...';
      text += `${hook}\n\n`;
    }

    if (v.peakMoment) {
      text += `${v.peakMoment}\n\n`;
    }

    text += `▶ ${v.url}\n`;
    text += `━━━━━━━━━━━━━━━━━━━\n\n`;
  }

  text += `<i>下次推送：明天 08:00 ｜ /yt 立即获取</i>`;
  return text;
}

async function sendTelegram(token, chatId, text) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' });
    const req = https.request({
      hostname: 'api.telegram.org',
      path: `/bot${token}/sendMessage`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, res => {
      let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(JSON.parse(d)));
    });
    req.on('error', reject);
    req.write(body); req.end();
  });
}

async function main() {
  const config = loadConfig();
  const env = loadEnv();

  const sources = JSON.parse(
    fs.readFileSync(path.join(SKILL_DIR, 'config', 'default-sources.json'), 'utf8')
  );

  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);
  const rawVideos = [];

  // Step 1: Fetch new videos from all channels
  process.stderr.write('Fetching RSS feeds...\n');
  for (const ch of sources.youtube_channels) {
    try {
      const xml = await fetchUrl(
        `https://www.youtube.com/feeds/videos.xml?channel_id=${ch.channel_id}`
      );
      const vids = parseRSS(xml).slice(0, 3);
      for (const v of vids) {
        if (new Date(v.publishedAt) >= cutoff) {
          rawVideos.push({ channel: ch.name, ...v });
        }
      }
    } catch (e) {
      process.stderr.write(`[skip] ${ch.name}: ${e.message}\n`);
    }
  }

  if (rawVideos.length === 0) {
    process.stderr.write('No new videos in last 48h.\n');
    return;
  }

  process.stderr.write(`Found ${rawVideos.length} new video(s). Analyzing with Gemini...\n`);

  // Step 2: For each video, get transcript + Gemini peak moment
  const videos = await Promise.all(rawVideos.map(async v => {
    const [transcript, peakMoment] = await Promise.all([
      config.ytdlpAvailable ? Promise.resolve(getTranscript(v.url)) : Promise.resolve(null),
      getPeakMoment(v.url, env.GEMINI_API_KEY),
    ]);
    return { ...v, transcript, peakMoment };
  }));

  // Step 3: Build digest
  const digest = buildDigest(videos, sources.youtube_channels.length);

  // Step 4: Deliver
  if (config.delivery?.method === 'telegram') {
    const token = env.TELEGRAM_BOT_TOKEN;
    const chatId = config.delivery.chatId;
    const chunks = digest.match(/[\s\S]{1,4000}/g) || [digest];
    for (const chunk of chunks) {
      const r = await sendTelegram(token, chatId, chunk);
      if (!r.ok) process.stderr.write(`Telegram error: ${JSON.stringify(r)}\n`);
    }
    process.stderr.write(`Pushed to Telegram.\n`);
  } else {
    process.stdout.write(digest + '\n');
  }
}

main().catch(e => { process.stderr.write(e.message + '\n'); process.exit(1); });
