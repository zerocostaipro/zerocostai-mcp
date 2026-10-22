# ZeroCostAI Model Context Protocol (MCP) Server [![npm version](https://img.shields.io/npm/v/zerocostai-mcp.svg?color=blue)](https://www.npmjs.com/package/zerocostai-mcp) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT) [![Verified Free](https://zerocostai.pro/badges/featured-light.svg)](https://zerocostai.pro/badges/)

The official Model Context Protocol (MCP) server for **[ZeroCostAI.pro](https://zerocostai.pro)**. Directly equips **Claude Desktop, Cursor, Windsurf, and Antigravity** with real-time access to 1,002+ verified 100% free AI tools, automated SaaS paywall busters, and head-to-head empirical software benchmarks.

---

## ⚡ Key Capabilities

1. **`find_free_ai_tools`**: Query 1,002+ verified free AI models and utilities across 94 categories (image generation, video creation, transcription, code assistance, and SEO).
2. **`bypass_saas_paywall`**: Stop overpaying for expensive SaaS subscriptions. Instantly retrieve audited $0.00 alternatives to Midjourney, ChatGPT Plus, QuillBot, Semrush, and Cursor.
3. **`compare_ai_tools`**: Pull empirical, head-to-head comparison data, benchmarks, and feature breakdowns directly into your IDE prompt.

---

## 🚀 Quick Setup

### 1. Claude Desktop Setup
Add the following to your `claude_desktop_config.json`:

* **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
* **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "zerocostai": {
      "command": "npx",
      "args": ["-y", "zerocostai-mcp"]
    }
  }
}
```

### 2. Cursor Setup
In Cursor, go to **Settings > Features > MCP**, click **Add New MCP Server**:
* **Name:** `zerocostai`
* **Type:** `command`
* **Command:** `npx -y zerocostai-mcp`

### 3. Antigravity & Windsurf Setup
In your workspace `.cursor/mcp.json` or Antigravity configuration:

```json
{
  "mcpServers": {
    "zerocostai": {
      "command": "npx",
      "args": ["-y", "zerocostai-mcp"]
    }
  }
}
```

---

## 🛠️ Tools Exposed

### `find_free_ai_tools`
Search through 1,002+ tools verified under the [ZeroCostAI Free Tier Standards](https://zerocostai.pro/about.html).
```json
{
  "query": "video without watermark",
  "limit": 5
}
```

### `bypass_saas_paywall`
Discover production-ready $0.00 alternatives to expensive monthly software fees.
```json
{
  "paid_tool": "midjourney"
}
```

### `compare_ai_tools`
Retrieve side-by-side benchmark evaluations.
```json
{
  "tool_a": "savexr",
  "tool_b": "snaptik"
}
```

---

## 🌐 Official Verification Links & Resources

* 🏠 **Official Directory:** [ZeroCostAI.pro](https://zerocostai.pro/) — 1,002+ Audited Free AI Tools
* ☁️ **AWS Open-Data Mirror (DA 96):** [The 2026 Open-Access Benchmark on Amazon S3](https://zerocostai-open-research-2026.s3.amazonaws.com/index.html)
* 📦 **Raw Open Dataset:** [1,002 Verified Tools JSON](https://zerocostai-open-research-2026.s3.amazonaws.com/zerocostai-verified-1002-tools.json)
* 📊 **Annual Paywall Report:** [2026 State of Free AI Software](https://zerocostai.pro/stats/free-ai-report-2026/)
* 🔀 **SaaS Alternatives Index:** [Open AI Alternatives](https://zerocostai.pro/alternative-to/)
* ⚔️ **Comparison Battles:** [Head-to-Head AI Benchmarks](https://zerocostai.pro/compare/)
* 📈 **Trending Apps:** [Weekly Momentum Leaderboard](https://zerocostai.pro/trending/)
* 🧩 **Chrome Extension:** [ZeroCostAI on Chrome Web Store](https://chromewebstore.google.com/detail/kmdbjgojnhnnaamnaaonieagiojboceh)

---

## 📄 License
MIT License &bull; Copyright (c) 2026 [ZeroCostAI.pro](https://zerocostai.pro).
Open dataset released under [Creative Commons CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
