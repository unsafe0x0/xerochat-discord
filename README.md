# Xerochat Discord Bot

![GitHub license](https://img.shields.io/github/license/unsafe0x0/xerochat-discord)
![GitHub issues](https://img.shields.io/github/issues/unsafe0x0/xerochat-discord)
![GitHub stars](https://img.shields.io/github/stars/unsafe0x0/xerochat-discord)
![Discord](https://img.shields.io/discord/your-discord-server-id?label=discord)
![Bun](https://img.shields.io/badge/Bun-%E2%9C%94-green)

A Discord bot powered by Groq AI that provides intelligent chat responses. Built with discord.js.

## Features

- **AI Powered Chat**: Interact with Xerochat through slash commands or direct messages
- **Smart Mentions**: Responds when mentioned in servers or receives DMs
- **Message Management**: Bulk delete messages with the `/clear` command

## Commands

### `/xero <message>`
Chat with Xerochat using the Groq AI API.

**Example:**
```
/xero What's the meaning of life?
```

### `/clear [count]`
Bulk delete recent messages in a channel. Requires "Manage Messages" permission.

**Parameters:**
- `count` (optional): Number of messages to delete (1-100, default: 10)

**Example:**
```
/clear 50
```

## Project Structure

```
xerochat-discord/
├── index.js                          # Main entry point
├── package.json                      # Dependencies and scripts
├── .env                             # Environment variables (not in repo)
├── src/
│   ├── config.js                     # Configuration and constants
│   ├── commands/
│   │   └── index.js                  # Slash command definitions
│   ├── services/
│   │   └── aiService.js              # Groq API integration
│   └── handlers/
│       ├── interactionHandler.js     # Slash command handlers
│       └── messageHandler.js         # Message event handlers
└── README.md
```

## Setup

### Prerequisites

- [Bun](https://bun.sh) runtime installed
- Discord Bot Token
- Groq API Key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd xerochat-discord
```

2. Install dependencies:
```bash
bun install
```

3. Create a `.env` file in the root directory:
```env
DISCORD_TOKEN=your_discord_bot_token_here
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama3-8b-8192
```

4. Configure your Discord bot:
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Create a new application or select existing one
   - Enable the following intents in the Bot section:
     - Message Content Intent
     - Server Members Intent (optional)
   - Copy the bot token to your `.env` file

### Running the Bot

Start the bot with:
```bash
bun start
```

Or directly:
```bash
bun run index.js
```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DISCORD_TOKEN` | Your Discord bot token | Yes | - |
| `GROQ_API_KEY` | Your Groq API key for AI responses | Yes | - |
| `GROQ_MODEL` | Groq model to use | No | `llama3-8b-8192` |

## Configuration

The bot's personality and behavior can be customized in `src/config.js`:

- **SYSTEM_PROMPT**: Defines the AI's personality and response style
- **BOT_CONFIG**: Sets the bot's presence and activity status

## Development

### Adding New Commands

1. Add command definition in `src/commands/index.js`
2. Add command handler in `src/handlers/interactionHandler.js`
3. Restart the bot to register the new command

### Adding New Features

The modular structure makes it easy to extend:
- **New services**: Add to `src/services/`
- **New handlers**: Add to `src/handlers/`
- **New commands**: Update `src/commands/`

## Dependencies

- **discord.js**: Discord API wrapper
- **dotenv**: Environment variable management
- **node-fetch**: HTTP client for Groq API

## Bot Permissions

The bot requires the following permissions:
- Read Messages/View Channels
- Send Messages
- Manage Messages (for `/clear` command)
- Read Message History
- Use Slash Commands

## Author

Developed by Priyanshu (Unsafezero)