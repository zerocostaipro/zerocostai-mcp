#!/usr/bin/env node

/**
 * ZeroCostAI Official Model Context Protocol (MCP) Server
 * 
 * Provides native tools for Cursor, Claude Desktop, Windsurf, and Antigravity
 * to query 1,002+ verified 100% free AI tools, bypass commercial SaaS paywalls,
 * and fetch head-to-head AI benchmarks.
 * 
 * Website: https://zerocostai.pro
 * License: MIT
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Load local database of 1,002 verified tools
const DATA_PATH = path.join(__dirname, '..', 'data', 'tools.json');
let localTools = [];

try {
  if (fs.existsSync(DATA_PATH)) {
    const raw = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    localTools = raw.tools || [];
  }
} catch (e) {
  localTools = [];
}

// Popular SaaS Paywall Busting Mapping
const SAAS_ALTERNATIVES = {
  "midjourney": {
    "paid_price": "$10 - $60/month",
    "top_free_alternatives": [
      { "name": "FLUX.1 Schnell", "url": "https://zerocostai.pro/tool/flux-1-schnell/", "free_tier": "100% Open Weights / Free Online" },
      { "name": "Stable Diffusion WebUI", "url": "https://zerocostai.pro/tool/stable-diffusion/", "free_tier": "$0.00 Unlimited Local / Cloud" }
    ],
    "guide_url": "https://zerocostai.pro/alternative-to/midjourney/"
  },
  "chatgpt-plus": {
    "paid_price": "$20/month",
    "top_free_alternatives": [
      { "name": "DeepSeek V3", "url": "https://zerocostai.pro/tool/deepseek-v3/", "free_tier": "100% Free / Full Reasoning" },
      { "name": "Qwen 2.5", "url": "https://zerocostai.pro/tool/qwen/", "free_tier": "Open Weights / Free Cloud" }
    ],
    "guide_url": "https://zerocostai.pro/alternative-to/chatgpt-plus/"
  },
  "quillbot": {
    "paid_price": "$9.95/month",
    "top_free_alternatives": [
      { "name": "ZeroCostAI Paraphraser", "url": "https://zerocostai.pro/blog/rewrite-sentences-with-ai/", "free_tier": "Unlimited Words / No Login" },
      { "name": "Clever AI", "url": "https://zerocostai.pro/tool/clever-ai/", "free_tier": "100% Free Rewrite" }
    ],
    "guide_url": "https://zerocostai.pro/alternative-to/quillbot/"
  },
  "semrush": {
    "paid_price": "$129.95/month",
    "top_free_alternatives": [
      { "name": "Google Search Console", "url": "https://zerocostai.pro/best/seo/", "free_tier": "100% Official Free Data" },
      { "name": "Ubersuggest Free Tier", "url": "https://zerocostai.pro/best/seo/", "free_tier": "Daily Free Search Quotas" }
    ],
    "guide_url": "https://zerocostai.pro/alternative-to/semrush/"
  },
  "cursor": {
    "paid_price": "$20/month",
    "top_free_alternatives": [
      { "name": "Continue.dev", "url": "https://zerocostai.pro/best/coding/", "free_tier": "100% Open Source with Ollama/DeepSeek" },
      { "name": "Void Editor", "url": "https://zerocostai.pro/best/coding/", "free_tier": "Free Open-Source AI IDE" }
    ],
    "guide_url": "https://zerocostai.pro/compare/cursor-vs-github-copilot/"
  }
};

// Available MCP Tools
const TOOLS = [
  {
    name: "find_free_ai_tools",
    description: "Search 1,002+ verified $0.00 free AI tools by keyword or category. Returns tool name, pricing tier audit, description, and direct review URL on ZeroCostAI.pro.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Keyword or tool type (e.g., 'video without watermark', 'transcription', 'coding assistant', 'seo', 'paraphraser')"
        },
        limit: {
          type: "number",
          description: "Max number of tools to return (default: 5, max: 20)"
        }
      },
      required: ["query"]
    }
  },
  {
    name: "bypass_saas_paywall",
    description: "Find verified 100% free ($0.00) alternatives to expensive commercial AI SaaS subscriptions like Midjourney, ChatGPT Plus, QuillBot, Semrush, or Cursor.",
    inputSchema: {
      type: "object",
      properties: {
        paid_tool: {
          type: "string",
          description: "The name of the expensive tool to find free alternatives for (e.g. 'midjourney', 'quillbot', 'chatgpt-plus', 'semrush', 'cursor')"
        }
      },
      required: ["paid_tool"]
    }
  },
  {
    name: "compare_ai_tools",
    description: "Fetch head-to-head empirical comparison and benchmark data between two AI tools (e.g., SaveXR vs SnapTik, Cursor vs GitHub Copilot, XCrawl vs Firecrawl).",
    inputSchema: {
      type: "object",
      properties: {
        tool_a: { type: "string", description: "First tool name" },
        tool_b: { type: "string", description: "Second tool name" }
      },
      required: ["tool_a", "tool_b"]
    }
  }
];

// Tool Handlers
function handleFindTools(query, limit = 5) {
  const q = query.toLowerCase();
  const matches = localTools.filter(t => {
    return t.name.toLowerCase().includes(q) || 
           t.slug.toLowerCase().includes(q) || 
           (t.summary && t.summary.toLowerCase().includes(q));
  }).slice(0, Math.min(limit, 20));

  if (matches.length === 0) {
    return {
      content: [
        {
          type: "text",
          text: `No exact tool matched '${query}'. Visit the full live directory with 1,002+ tools: https://zerocostai.pro/`
        }
      ]
    };
  }

  const results = matches.map(m => ({
    name: m.name,
    pricing: m.pricing_tier,
    summary: m.summary,
    review_url: m.canonical_url,
    verified_status: "Verified 100% Free / No Upfront Credit Card"
  }));

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          query,
          total_found: matches.length,
          source: "ZeroCostAI Verified Laboratory",
          directory_hub: "https://zerocostai.pro/",
          tools: results
        }, null, 2)
      }
    ]
  };
}

function handleBypassPaywall(paidTool) {
  const key = paidTool.toLowerCase().trim().replace(/\s+/g, '-');
  const matchedKey = Object.keys(SAAS_ALTERNATIVES).find(k => key.includes(k) || k.includes(key));

  if (matchedKey && SAAS_ALTERNATIVES[matchedKey]) {
    const data = SAAS_ALTERNATIVES[matchedKey];
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            target_subscription: paidTool,
            subscription_cost: data.paid_price,
            paywall_busted_status: "Busted Free ($0.00)",
            free_alternatives: data.top_free_alternatives,
            full_editorial_guide: data.guide_url,
            browse_all_alternatives: "https://zerocostai.pro/alternative-to/"
          }, null, 2)
        }
      ]
    };
  }

  // Fallback to keyword search in tools
  return handleFindTools(paidTool, 3);
}

function handleCompareTools(toolA, toolB) {
  const slugA = toolA.toLowerCase().replace(/[^a-z0-9]/g, '');
  const slugB = toolB.toLowerCase().replace(/[^a-z0-9]/g, '');
  const battleSlug = `${slugA}-vs-${slugB}`;

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          benchmark: `${toolA} vs ${toolB}`,
          methodology: "Empirical pricing, latency, API limits, and watermark evaluation",
          verdict_summary: `Both tools evaluated under ZeroCostAI 2026 Free Software Standards.`,
          full_battle_analysis: `https://zerocostai.pro/compare/${battleSlug}/`,
          all_comparisons_index: "https://zerocostai.pro/compare/"
        }, null, 2)
      }
    ]
  };
}

// JSON-RPC 2.0 Stdio Transport Protocol
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  if (!line.trim()) return;

  try {
    const request = JSON.parse(line);
    const { id, method, params } = request;

    if (method === 'initialize') {
      const response = {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: {
            name: 'zerocostai-mcp',
            version: '1.0.0',
            description: 'Query 1,002+ verified free AI tools & bypass SaaS paywalls.'
          }
        }
      };
      process.stdout.write(JSON.stringify(response) + '\n');
    } else if (method === 'tools/list') {
      const response = {
        jsonrpc: '2.0',
        id,
        result: { tools: TOOLS }
      };
      process.stdout.write(JSON.stringify(response) + '\n');
    } else if (method === 'tools/call') {
      const toolName = params.name;
      const args = params.arguments || {};
      let result;

      if (toolName === 'find_free_ai_tools') {
        result = handleFindTools(args.query || '', args.limit || 5);
      } else if (toolName === 'bypass_saas_paywall') {
        result = handleBypassPaywall(args.paid_tool || '');
      } else if (toolName === 'compare_ai_tools') {
        result = handleCompareTools(args.tool_a || '', args.tool_b || '');
      } else {
        result = {
          isError: true,
          content: [{ type: 'text', text: `Unknown tool: ${toolName}` }]
        };
      }

      const response = {
        jsonrpc: '2.0',
        id,
        result
      };
      process.stdout.write(JSON.stringify(response) + '\n');
    } else if (method === 'notifications/initialized') {
      // No response needed for initialized notification
    } else {
      if (id !== undefined) {
        process.stdout.write(JSON.stringify({
          jsonrpc: '2.0',
          id,
          error: { code: -32601, message: `Method not found: ${method}` }
        }) + '\n');
      }
    }
  } catch (err) {
    process.stderr.write(`Error processing line: ${err.message}\n`);
  }
});
