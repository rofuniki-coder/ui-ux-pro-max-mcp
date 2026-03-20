<div align="center">
  <h1>✨ UI/UX Pro Max MCP Server ✨</h1>
  <p><i>A powerful Model Context Protocol (MCP) server providing structured UI/UX design intelligence, patterns, and guidelines.</i></p>

  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![MCP](https://img.shields.io/badge/MCP-Ready-success?style=for-the-badge)](https://modelcontextprotocol.io/)
  [![GitHub stars](https://img.shields.io/github/stars/rofuniki-coder/ui-ux-pro-max-mcp?style=for-the-badge&color=gold)](https://github.com/rofuniki-coder/ui-ux-pro-max-mcp/stargazers)
</div>

---

## 📖 Background & Goal

This project is an **unofficial MCP (Model Context Protocol) adaptation** of the incredible `ui-ux-pro-max-skill`.

The original repository is an amazing AI "skill" designed to provide design intelligence. **Our goal** was to turn this massive knowledge base from a raw prompt/skill format into a fully functional **MCP Server**. By doing this, we make it infinitely easier for any AI agent (like Claude Desktop, Cursor, or VS Code) to directly query, search, and retrieve these UI/UX guidelines programmatically through standard tool calls, rather than relying on copying and pasting markdown prompts.

All credit for the original design intelligence, patterns, and guidelines goes to the creators of `ui-ux-pro-max-skill`.

## 🚀 Features

- 🧠 **Comprehensive Database**: `1,400+` UI/UX patterns, guidelines, and technical stack best practices.
- 🔍 **Fuzzy Search**: Quickly find relevant patterns by keywords using intelligent matching.
- 📦 **Structured Data**: Returns clean JSON objects highly optimized for AI agents and LLMs.
- 💡 **Actionable Suggestions**: Generate design recommendations based strictly on your project context.

## 🛠️ Tools Provided

| Tool Name | Description | Input Schema |
| :--- | :--- | :--- |
| 🔎 `search_patterns` | Search for UI/UX patterns and design guidelines based on keywords. | `{ "query": "string" }` |
| 📖 `get_pattern` | Get detailed information about a specific UI/UX pattern by ID. | `{ "id": "string" }` |
| 🗂️ `list_categories` | List all available UI/UX pattern categories. | `{}` (None) |
| ✨ `generate_ui_suggestions` | Generate UI/UX design suggestions based on project context. | `{ "context": "string" }` |

## 💻 Installation

### Prerequisites
- **Node.js** (v18+)
- **TypeScript**

### Setup

1. **Clone this repository**
   ```bash
   git clone https://github.com/rofuniki-coder/ui-ux-pro-max-mcp.git
   cd ui-ux-pro-max-mcp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the server**
   ```bash
   npm run build
   ```

*(Optional)* If you need to re-process the source data from the original repo, ensure it's available in `repo-temp/` and run `npm run process-data`.

## ⚙️ Configuration

To use this server with **Cursor**, **VS Code** (via MCP extension), or **Claude Desktop**, add the following to your MCP configuration JSON:

### Running via `npx` (Dev mode)
```json
{
  "mcpServers": {
    "ui-ux-pro": {
      "command": "npx",
      "args": [
        "-y",
        "ts-node",
        "C:/absolute/path/to/ui-ux-pro-max-mcp/src/index.ts",
        "--stdio"
      ]
    }
  }
}
```

### Running the Built Version (Production)
```json
{
  "mcpServers": {
    "ui-ux-pro": {
      "command": "node",
      "args": [
        "C:/absolute/path/to/ui-ux-pro-max-mcp/build/index.js",
        "--stdio"
      ]
    }
  }
}
```
*(Make sure to replace `C:/absolute/path/to/...` with the actual path to your repository).*

## 🎯 Usage Example

### Searching for patterns
**Tool**: `search_patterns`
**Arguments**: 
```json
{
  "query": "dashboard accessibility"
}
```

### Getting a specific pattern
**Tool**: `get_pattern`
**Arguments**: 
```json
{
  "id": "ui-ux-pro-max-color-contrast"
}
```

## 🙏 Acknowledgements
This project is an MCP wrapper. All core data and design principles are sourced from the original `ui-ux-pro-max-skill` repository.
