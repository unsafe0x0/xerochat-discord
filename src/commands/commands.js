import { SlashCommandBuilder } from "discord.js";

export const commands = [
  new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Bulk delete recent messages")
    .addIntegerOption((opt) =>
      opt
        .setName("count")
        .setDescription("Number of recent messages to remove (1-100)")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(false)
    )
    .toJSON(),

  new SlashCommandBuilder()
    .setName("xero")
    .setDescription("Chat with Xerochat")
    .addStringOption((opt) =>
      opt
        .setName("message")
        .setDescription("Your message to Xerochat")
        .setRequired(true)
    )
    .toJSON(),
];
