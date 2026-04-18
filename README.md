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

## Tracked Builders (10)

**Builder test:** Does this person build/code on camera? If yes, in. If they only talk about what others built, out.

### ★ Tier 1 — Depth builders (write or run code on camera)

| Builder | Domain | Why in / cadence |
|---------|--------|-----------------|
| [Andrej Karpathy](https://www.youtube.com/@AndrejKarpathy) | ML / LLMs | Codes neural nets from scratch. GPT-2, tokenizers, transformers — live. ~1.3M subs. 4-5 videos/year, each 1-4h. |
| [Yannic Kilcher](https://www.youtube.com/@YannicKilcher) | ML research | Reads actual papers on camera, builds intuition for what the math means in practice. Covers papers as they drop. ~308K subs. |
| [Jeremy Howard](https://www.youtube.com/@jeremyphoward) | Deep learning | fast.ai founder. Builds DL from first principles on camera — best "understand by building" course for coders. ~145K subs. |
| [George Hotz / geohot](https://www.youtube.com/@geohotorg) | Self-driving / ML infra | Livestreams writing AI systems without a script. Built tinygrad and comma.ai. Fights CUDA live. ~216K subs. |
| [Sebastian Raschka](https://www.youtube.com/@sebastianraschka) | LLMs from scratch | Author of *Build a Large Language Model from Scratch*. Channel follows the book — PyTorch, first principles. ~62K subs. |
| [Umar Jamil](https://www.youtube.com/@umarjamil) | Transformers / diffusion | Implements transformers, RLHF, diffusion models from scratch in code. Undersubscribed relative to quality. ~50K subs. |

### ☆ Tier 2 — Breadth builders (ship demos, cover the landscape)

| Builder | Domain | Why in / cadence |
|---------|--------|-----------------|
| [Sentdex](https://www.youtube.com/@sentdex) | Python / ML | YouTube-native since 2012. Codes AI on camera start to finish — neural nets, robotics, trading. ~1.3M subs, weekly. |
| [3Blue1Brown](https://www.youtube.com/@3blue1brown) | Math / Neural nets | Builds visualizations that make attention and transformers click. Not a coder — a visual builder. ~8.2M subs. |
| [Fireship](https://www.youtube.com/@Fireship) | Full-stack / AI tools | Best signal layer — covers every significant AI release within days. Ships code demos in under 10 min. ~4.1M subs. |
| [Theo (t3.gg)](https://www.youtube.com/@t3dotgg) | Full-stack / AI products | Ships full-stack AI products live. Built T3 Chat in 5 days. Honest developer take, no hype. ~472K subs. |

Want to suggest a channel? Open an issue. State what they built on camera in the last 3 months.

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

### 追踪的 Builders（10位）

**筛选标准：** 这个人在镜头前写代码或 ship 产物吗？是 → 入选。只谈别人做了什么 → 不入选。

**★ 一级 — 深度 Builder（在镜头前写/跑代码）**

| Builder | 领域 | 为什么入选 |
|---------|------|-----------|
| [Andrej Karpathy](https://www.youtube.com/@AndrejKarpathy) | ML / 大模型 | 从零写神经网络，GPT-2、tokenizer 全在镜头前完成。~130万订阅。 |
| [Yannic Kilcher](https://www.youtube.com/@YannicKilcher) | ML 研究 | 在镜头前读 ML 论文，把数学直觉在代码层讲清楚。新论文一出就跟上。 |
| [Jeremy Howard](https://www.youtube.com/@jeremyphoward) | 深度学习 | fast.ai 创始人。在镜头前从第一原理构建 DL。~14.5万订阅。 |
| [George Hotz / geohot](https://www.youtube.com/@geohotorg) | 自动驾驶 / ML基础设施 | 直播写 AI 系统，没有脚本。做了 tinygrad 和 comma.ai。~21.6万订阅。 |
| [Sebastian Raschka](https://www.youtube.com/@sebastianraschka) | 从零实现大模型 | 《从零构建大语言模型》作者。频道跟书走，PyTorch 第一原理。~6.2万订阅。 |
| [Umar Jamil](https://www.youtube.com/@umarjamil) | Transformer / 扩散模型 | 从零实现 Transformer、RLHF、扩散模型。订阅量低于应有水平。~5万订阅。 |

**☆ 二级 — 广度 Builder（ship demo、覆盖技术全景）**

| Builder | 领域 | 为什么入选 |
|---------|------|-----------|
| [Sentdex](https://www.youtube.com/@sentdex) | Python / ML | YouTube 原生，2012年起就在镜头前写代码。神经网络、机器人、量化交易。~130万订阅。 |
| [3Blue1Brown](https://www.youtube.com/@3blue1brown) | 数学 / 神经网络 | 构建让 Attention 和 Transformer 真正清楚的视觉化工具。不写代码，但是视觉 Builder。~820万订阅。 |
| [Fireship](https://www.youtube.com/@Fireship) | 全栈 / AI工具 | 最好的广度信号层。每个重要 AI 发布几天内就覆盖，10分钟内 ship 可运行 demo。~410万订阅。 |
| [Theo (t3.gg)](https://www.youtube.com/@t3dotgg) | 全栈 / AI产品 | 直播 ship AI 产品。T3 Chat 5天做完。对 AI 工具链有诚实的开发者视角，不炒作。~47万订阅。 |

### 安装

```bash
# Claude Code
git clone https://github.com/flychicken067/ivan-youtube-builders.git ~/.claude/skills/ivan-youtube-builders

# 可选：字幕摘要支持
pip install yt-dlp
```

然后对 Claude 说"设置 YouTube builders" 或运行 `/yt`。

MIT · [一万刘](https://github.com/flychicken067) · [𝕏](https://x.com/flychicken067)
