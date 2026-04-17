#!/usr/bin/env node
/**
 * prepare-digest.js — fetch recent YouTube videos from builder channels
 * Outputs a single JSON blob to stdout for Claude to remix.
 * No API keys needed. Uses public YouTube RSS feeds + yt-dlp for transcripts.
 */

const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CONFIG_DIR = path.join(os.homedir(), '.ivan-youtube-builders');
const SKILL_DIR = path.dirname(__dirname);

function loadConfig() {
  const userConfig = path.join(CONFIG_DIR, 'config.json');
  if (fs.existsSync(userConfig)) return JSON.parse(fs.readFileSync(userConfig, 'utf8'));
  return { language: 'en', ytdlpAvailable: false };
}

function loadSources() {
  const defaults = JSON.parse(fs.readFileSync(path.join(SKILL_DIR, 'config', 'default-sources.json'), 'utf8'));
  const userExtra = path.join(CONFIG_DIR, 'config.json');
  if (fs.existsSync(userExtra)) {
    const u = JSON.parse(fs.readFileSync(userExtra, 'utf8'));
    if (u.custom_channels) defaults.youtube_channels.push(...u.custom_channels);
    if (u.blocked_channels) {
      defaults.youtube_channels = defaults.youtube_channels.filter(
        c => !u.blocked_channels.includes(c.handle)
      );
    }
  }
  return defaults;
}

function loadPrompts() {
  const promptDir = path.join(SKILL_DIR, 'prompts');
  const userPromptDir = path.join(CONFIG_DIR, 'prompts');
  const load = (name) => {
    const userFile = path.join(userPromptDir, name);
    const defaultFile = path.join(promptDir, name);
    if (fs.existsSync(userFile)) return fs.readFileSync(userFile, 'utf8');
    if (fs.existsSync(defaultFile)) return fs.readFileSync(defaultFile, 'utf8');
    return '';
  };
  return {
    summarize_video: load('summarize-video.md'),
    digest_intro: load('digest-intro.md'),
  };
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseYouTubeRSS(xml) {
  // Parse video entries from YouTube RSS feed
  const videos = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;
  while ((match = entryRegex.exec(xml)) !== null) {
    const entry = match[1];
    const title = (entry.match(/<title>(.*?)<\/title>/) || [])[1] || '';
    const videoId = (entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/) || [])[1] || '';
    const published = (entry.match(/<published>(.*?)<\/published>/) || [])[1] || '';
    const description = (entry.match(/<media:description>([\s\S]*?)<\/media:description>/) || [])[1] || '';
    if (videoId) {
      videos.push({
        videoId,
        title: title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
        url: `https://www.youtube.com/watch?v=${videoId}`,
        publishedAt: published,
        description: description.slice(0, 300).replace(/&amp;/g, '&'),
      });
    }
  }
  return videos;
}

function getTranscript(videoUrl, ytdlpAvailable) {
  if (!ytdlpAvailable) return null;
  try {
    const result = execSync(
      `yt-dlp --write-auto-sub --sub-lang en --skip-download --sub-format vtt -o /tmp/yt-transcript "${videoUrl}" 2>/dev/null && cat /tmp/yt-transcript.en.vtt 2>/dev/null || echo ""`,
      { timeout: 30000, encoding: 'utf8' }
    );
    // Strip VTT formatting, get plain text, deduplicate repeated lines
    const seen = new Set();
    const plain = result
      .replace(/WEBVTT[\s\S]*?\n\n/, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\d{2}:\d{2}:\d{2}[.,]\d{3}\s*-->\s*[\s\S]*?\n/g, '')
      .replace(/^\d+\s*$/gm, '')
      .split('\n')
      .map(l => l.trim())
      .filter(l => l && !seen.has(l) && seen.add(l))
      .join(' ')
      .slice(0, 3000); // First 3000 chars is enough for remixing
    return plain || null;
  } catch {
    return null;
  }
}

async function main() {
  const config = loadConfig();
  const sources = loadSources();
  const prompts = loadPrompts();
  const errors = [];
  const videos = [];

  const lookbackMs = 48 * 60 * 60 * 1000; // 48 hours
  const cutoff = new Date(Date.now() - lookbackMs);

  for (const channel of sources.youtube_channels) {
    try {
      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channel.channel_id}`;
      const xml = await fetchUrl(rssUrl);
      const channelVideos = parseYouTubeRSS(xml);

      for (const video of channelVideos.slice(0, 3)) { // check last 3 videos
        if (new Date(video.publishedAt) >= cutoff) {
          const transcript = getTranscript(video.url, config.ytdlpAvailable);
          videos.push({
            channel: channel.name,
            why_builder: channel.why_builder,
            ...video,
            transcript,
          });
        }
      }
    } catch (e) {
      errors.push({ channel: channel.name, error: e.message });
    }
  }

  const output = {
    config,
    videos,
    prompts,
    stats: { newVideos: videos.length, channels: sources.youtube_channels.length },
    errors,
  };

  process.stdout.write(JSON.stringify(output, null, 2));
}

main().catch(e => process.stderr.write(e.message));
