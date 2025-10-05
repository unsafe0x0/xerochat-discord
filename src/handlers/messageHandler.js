import { ChannelType } from "discord.js";
import { getAIResponse } from "../services/aiService.js";

/**
 * Handle incoming messages
 * @param {Message} message
 * @param {Client} client
 */
export async function handleMessage(message, client) {
  if (message.author.bot) return;

  if (
    message.channel.type === ChannelType.DM ||
    message.mentions.users.has(client.user.id)
  ) {
    try {
      await message.channel.sendTyping();

      const reply = await getAIResponse(message.content);
      return message.reply({ content: reply });
    } catch (err) {
      return message.reply({
        content: `Could not get a reply from Xerochat: ${err.message || err}`,
      });
    }
  }
}
