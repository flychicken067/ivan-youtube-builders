**English** | [中文](#chinese)

# Ivan's YouTube Builders Digest

_Watch builders, not talkers._

Daily summaries of what top AI builders actually **shipped, built, or taught** on YouTube — not what they said about the industry.

⭐ Star · 👁 Watch · 📡 [RSS](../../commits/main.atom)

[**English**](#english) · [**中文**](#chinese)

---

## <a id="english"></a>📺 April 17, 2026

**Today: 2 new videos from 4 tracked builders.**

<p align="center">

[![📺 Install Skill](https://img.shields.io/badge/📺_Install_Skill-blue?style=for-the-badge)](#installation)
[![🇨🇳 中文](https://img.shields.io/badge/🇨🇳_中文-gray?style=for-the-badge)](#chinese)

</p>

**3Blue1Brown** — Covered 10-point geometry using a combinatorial structure proof, showing why brute force collapses and pattern surfaces. The visual makes the argument: this is how he builds understanding, not delivers it.
▶ https://www.youtube.com/watch?v=QLu_ZsRc_G0

**Fireship** — Built a full breakdown of the WordPress plugin supply-chain attack: how $100k bought 30+ plugins, how a backdoor went unnoticed for 8 months, and what the actual malicious code looked like (3 lines). Concrete artifact, not commentary.
▶ https://www.youtube.com/watch?v=piah4fV_o2Q

*Karpathy / geohot: no new videos in the last 48h.*

[→ Install the skill to get this in your Telegram every morning](#installation)

---

## What You Get

A daily or weekly digest delivered to Telegram, email, or in-chat with:

- What each builder **made or demonstrated** — not what they talked about
- Why it matters for someone learning at the builder level
- Direct links to every video
- Available in English, Chinese, or bilingual

**The builder test:** Does this person build things on camera? If yes, they're in. If they react to what others built, they're not.

---

## Quick Start

1. Install the skill in Claude Code or OpenClaw ([see below](#installation))
2. Say `set up youtube builders` or run `/yt`
3. The agent walks you through setup — no config files to edit

The agent will ask:
- How often (daily or weekly) and what time
- Language (English / Chinese / bilingual)
- How to deliver (Telegram, email, or in-chat)

No API keys needed. Your first digest arrives immediately after setup.

---

## Tracked Builders (4)

| Builder | Channel | Why a builder, not a KOL |
|---------|---------|--------------------------|
| [Andrej Karpathy](https://www.youtube.com/@AndrejKarpathy) | ML / LLMs | Writes code on camera. Videos are a byproduct of building. |
| [George Hotz / geohot](https://www.youtube.com/@geohotorg) | Self-driving / tinygrad | Livestreams writing AI systems. Ships comma.ai. |
| [3Blue1Brown](https://www.youtube.com/@3blue1brown) | Math / Neural nets | Builds visualizations that make hard concepts actually click. |
| [Fireship](https://www.youtube.com/@Fireship) | Full-stack / AI tools | Ships working code demos in under 10 minutes. Always a real artifact. |

Want to suggest a channel? Open an issue. It needs to pass the builder test: *what did they make on camera in the last 3 months?*

---

## Changing Settings

Tell your agent in plain English:

- "Switch to weekly digests on Monday mornings"
- "Change language to Chinese"
- "Add [channel name] to my sources"
- "Make the summaries shorter"
- "Show me my current settings"

---

## Customizing Summaries

The skill uses plain-English prompt files. Edit them directly or tell your agent what you want:

- `prompts/summarize-video.md` — how each video is summarized
- `prompts/digest-intro.md` — the overall digest format and tone

Changes take effect on the next digest.

---

## Installation

### Claude Code
```bash
git clone https://github.com/flychicken067/ivan-youtube-builders.git ~/.claude/skills/ivan-youtube-builders
```

### OpenClaw
```bash
git clone https://github.com/flychicken067/ivan-youtube-builders.git ~/skills/ivan-youtube-builders
```

**Optional — transcript summaries (recommended):**
```bash
pip install yt-dlp
# or
brew install yt-dlp
```
Without yt-dlp, the digest uses video titles and descriptions only. With it, summaries are based on the actual transcript.

---

## How It Works

1. The skill fetches public YouTube RSS feeds from each tracked channel — no API keys needed
2. Videos published in the last 48h are collected
3. If yt-dlp is installed, transcripts are pulled and cleaned
4. Your agent remixes the content into a digest following `prompts/summarize-video.md`
5. Delivered to Telegram, email, or shown in-chat

---

## Requirements

- Claude Code or OpenClaw
- Internet connection
- yt-dlp (optional, for transcript-based summaries)

---

## Privacy

- No API keys sent anywhere — YouTube RSS feeds are public
- Telegram/email keys stored locally in `~/.ivan-youtube-builders/.env`
- Your config and preferences stay on your machine

---

## License

MIT · Built by [Ivan (一万刘)](https://github.com/flychicken067) · [𝕏 @flychicken067](https://x.com/flychicken067)

---

## <a id="chinese"></a>中文版

_看造东西的人，不看说东西的人。_

每天总结 4 位顶级 AI builder 在 YouTube 上**真正做了什么**——不是他们对行业说了什么。

### 📺 2026年4月17日

**今日：4个频道中有 2 条新视频。**

**3Blue1Brown** — 用10点覆盖问题演示了一个组合数学结构证明：暴力枚举为什么失效，规律为什么必然涌现。视觉化本身就是论证——这是他构建理解的方式，不是传递结论的方式。
▶ https://www.youtube.com/watch?v=QLu_ZsRc_G0

**Fireship** — 完整还原了 WordPress 插件供应链攻击：$10万收购30+插件，后门藏了8个月没人发现，恶意代码实际上就3行。有具体产物，不是评论。
▶ https://www.youtube.com/watch?v=piah4fV_o2Q

*Karpathy / geohot：过去48小时无新视频。*

### 追踪的 Builders（4位）

| Builder | 频道 | 为什么是 Builder 不是 KOL |
|---------|------|--------------------------|
| [Andrej Karpathy](https://www.youtube.com/@AndrejKarpathy) | ML / 大模型 | 在镜头前写代码，视频是副产品 |
| [George Hotz / geohot](https://www.youtube.com/@geohotorg) | 自动驾驶 / tinygrad | 直播写 AI 系统，做了 comma.ai |
| [3Blue1Brown](https://www.youtube.com/@3blue1brown) | 数学 / 神经网络 | 构建让难概念真正清楚的视觉化工具 |
| [Fireship](https://www.youtube.com/@Fireship) | 全栈 / AI工具 | 10分钟内 ship 可运行的代码 demo |

### 安装

```bash
# Claude Code
git clone https://github.com/flychicken067/ivan-youtube-builders.git ~/.claude/skills/ivan-youtube-builders

# 可选：字幕摘要支持
pip install yt-dlp
```

然后对 Claude 说"设置 YouTube builders" 或运行 `/yt`。

MIT · [一万刘](https://github.com/flychicken067) · [𝕏](https://x.com/flychicken067)
