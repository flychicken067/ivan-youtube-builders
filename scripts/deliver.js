#!/usr/bin/env node
/**
 * deliver.js — send the digest via Telegram or Email
 * Usage: echo '<digest text>' | node deliver.js
 *    or: node deliver.js --file /tmp/digest.txt
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CONFIG_DIR = path.join(os.homedir(), '.ivan-youtube-builders');

function loadConfig() {
  const p = path.join(CONFIG_DIR, 'config.json');
  if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8'));
  return { delivery: { method: 'stdout' } };
}

function loadEnv() {
  const envPath = path.join(CONFIG_DIR, '.env');
  if (!fs.existsSync(envPath)) return {};
  const env = {};
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const m = line.match(/^([A-Z_]+)=(.+)$/);
    if (m) env[m[1]] = m[2].trim();
  });
  return env;
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

async function sendEmail(apiKey, to, text) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      from: 'Ivan YouTube Builders <digest@yourdomain.com>',
      to: [to],
      subject: `YouTube Builders Digest — ${new Date().toLocaleDateString()}`,
      text,
    });
    const req = https.request({
      hostname: 'api.resend.com',
      path: '/emails',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }, res => {
      let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(JSON.parse(d)));
    });
    req.on('error', reject);
    req.write(body); req.end();
  });
}

async function main() {
  let text = '';
  const fileArg = process.argv.indexOf('--file');
  if (fileArg !== -1 && process.argv[fileArg + 1]) {
    text = fs.readFileSync(process.argv[fileArg + 1], 'utf8');
  } else {
    text = fs.readFileSync('/dev/stdin', 'utf8');
  }

  const config = loadConfig();
  const method = config.delivery?.method || 'stdout';

  if (method === 'stdout') {
    process.stdout.write(text + '\n');
    return;
  }

  const env = loadEnv();

  if (method === 'telegram') {
    const token = env.TELEGRAM_BOT_TOKEN;
    const chatId = config.delivery.chatId;
    if (!token || !chatId) { process.stderr.write('Missing TELEGRAM_BOT_TOKEN or chatId\n'); process.exit(1); }
    // Telegram has 4096 char limit per message, split if needed
    const chunks = text.match(/[\s\S]{1,4000}/g) || [text];
    for (const chunk of chunks) await sendTelegram(token, chatId, chunk);
    process.stderr.write('Delivered via Telegram\n');
  } else if (method === 'email') {
    const apiKey = env.RESEND_API_KEY;
    const to = config.delivery.email;
    if (!apiKey || !to) { process.stderr.write('Missing RESEND_API_KEY or email\n'); process.exit(1); }
    await sendEmail(apiKey, to, text);
    process.stderr.write('Delivered via Email\n');
  }
}

main().catch(e => { process.stderr.write(e.message + '\n'); process.exit(1); });
