import {
  MessageFlags,
  PermissionsBitField,
  ChannelType,
} from "discord.js";
import { getAIResponse } from "../services/aiService.js";

/**
 * Handle the /clear command
 * @param {Interaction} interaction
 * @param {Client} client
 */
async function handleClearCommand(interaction, client) {
  const count = interaction.options.getInteger("count") || 10;

  if (interaction.inGuild()) {
    const member = interaction.member;
    if (!member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return interaction.reply({
        content: "You need the Manage Messages permission to do that.",
        ephemeral: true,
      });
    }

    await interaction.deferReply({
      ephemeral: true,
    });

    try {
      const deleted = await interaction.channel.bulkDelete(count, true);
      return interaction.editReply({
        content: `Deleted ${deleted.size} message(s).`,
      });
    } catch (err) {
      return interaction.editReply({
        content: `Could not delete messages: ${err.message || err}`,
      });
    }
  } else if (interaction.channel.type === ChannelType.DM) {
    await interaction.deferReply({
      ephemeral: true,
    });
    try {
      const messages = await interaction.channel.messages.fetch({
        limit: count,
      });
      let deletedCount = 0;
      for (const [id, msg] of messages) {
        if (msg.author.id === client.user.id) {
          await msg.delete();
          deletedCount++;
        }
      }
      return interaction.editReply({
        content: `Deleted ${deletedCount} of my messages.`,
      });
    } catch (err) {
      return interaction.editReply({
        content: `Could not delete messages in DM: ${err.message || err}`,
      });
    }
  } else {
    return interaction.reply({
      content: "This command only works in servers or DMs.",
      ephemeral: true,
    });
  }
}

/**
 * Handle the /xero command
 * @param {Interaction} interaction
 */
async function handleXeroCommand(interaction) {
  const message = interaction.options.getString("message");
  await interaction.deferReply();

  try {
    const reply = await getAIResponse(message);
    return interaction.editReply({ content: reply });
  } catch (err) {
    return interaction.editReply({
      content: `Could not get a reply from Xerochat: ${err.message || err}`,
    });
  }
}

/**
 * Main interaction handler
 * @param {Interaction} interaction
 * @param {Client} client
 */
export async function handleInteraction(interaction, client) {
  if (!interaction.isChatInputCommand()) return;

  const name = interaction.commandName;

  if (name === "clear") {
    return handleClearCommand(interaction, client);
  }

  if (name === "xero") {
    return handleXeroCommand(interaction);
  }
}
