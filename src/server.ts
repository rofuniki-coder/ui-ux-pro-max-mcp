import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { UIPattern } from './types';
import { searchPatterns } from './tools/search';
import { getPattern, listCategories } from './tools/getPattern';
import { generateUISuggestions } from './tools/suggest';
import fs from 'fs';
import path from 'path';

export class UIUXProServer {
  private server: Server;
  private patterns: UIPattern[] = [];

  constructor() {
    this.server = new Server(
      {
        name: 'ui-ux-pro',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.loadData();
    this.setupHandlers();
    
    // Error handling
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private loadData() {
    const dataPath = path.join(process.cwd(), 'data', 'index.json');
    if (fs.existsSync(dataPath)) {
      this.patterns = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      console.error(`Loaded ${this.patterns.length} patterns into memory.`);
    } else {
      console.error('Warning: data/index.json not found. Run "npm run process-data" first.');
    }
  }

  private setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'search_patterns',
          description: 'Search for UI/UX patterns and design guidelines based on keywords',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'Search query (e.g., "dashboard layout", "color contrast")',
              },
            },
            required: ['query'],
          },
        },
        {
          name: 'get_pattern',
          description: 'Get detailed information about a specific UI/UX pattern by ID',
          inputSchema: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'Pattern ID (e.g., "ux-color-contrast")',
              },
            },
            required: ['id'],
          },
        },
        {
          name: 'list_categories',
          description: 'List all available UI/UX pattern categories',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
        {
          name: 'generate_ui_suggestions',
          description: 'Generate UI/UX design suggestions based on project context',
          inputSchema: {
            type: 'object',
            properties: {
              context: {
                type: 'string',
                description: 'Project context or requirements (e.g., "SaaS analytics platform with dark mode")',
              },
            },
            required: ['context'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case 'search_patterns': {
          const query = request.params.arguments?.query as string;
          if (!query) {
            throw new McpError(ErrorCode.InvalidParams, 'Query is required');
          }
          const results = searchPatterns(this.patterns, query);
          return {
            content: [{ type: 'text', text: JSON.stringify(results, null, 2) }],
          };
        }

        case 'get_pattern': {
          const id = request.params.arguments?.id as string;
          if (!id) {
            throw new McpError(ErrorCode.InvalidParams, 'ID is required');
          }
          const pattern = getPattern(this.patterns, id);
          if (!pattern) {
            throw new McpError(ErrorCode.InvalidParams, `Pattern with ID ${id} not found`);
          }
          return {
            content: [{ type: 'text', text: JSON.stringify(pattern, null, 2) }],
          };
        }

        case 'list_categories': {
          const categories = listCategories(this.patterns);
          return {
            content: [{ type: 'text', text: JSON.stringify(categories, null, 2) }],
          };
        }

        case 'generate_ui_suggestions': {
          const context = request.params.arguments?.context as string;
          if (!context) {
            throw new McpError(ErrorCode.InvalidParams, 'Context is required');
          }
          const suggestions = generateUISuggestions(this.patterns, context);
          return {
            content: [{ type: 'text', text: JSON.stringify(suggestions, null, 2) }],
          };
        }

        default:
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${request.params.name}`
          );
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('UI/UX Pro MCP server running on stdio');
  }
}
