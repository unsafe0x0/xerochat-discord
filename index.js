import { Client, GatewayIntentBits, Partials } from "discord.js";
import { DISCORD_TOKEN, BOT_CONFIG } from "./src/config.js";
import { commands } from "./src/commands/commands.js";
import { handleInteraction } from "./src/handlers/interactionHandler.js";
import { handleMessage } from "./src/handlers/messageHandler.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.once("clientReady", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  try {
    await client.user.setPresence(BOT_CONFIG.presence);
  } catch (err) {
    console.error("Failed to set presence:", err);
  }

  try {
    await client.application.commands.set(commands);
    console.log("Slash commands registered successfully");
  } catch (err) {
    console.error("Failed to register commands:", err);
  }
});

client.on("interactionCreate", async (interaction) => {
  await handleInteraction(interaction, client);
});

client.on("messageCreate", async (message) => {
  await handleMessage(message, client);
});

client.login(DISCORD_TOKEN);

