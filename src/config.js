import dotenv from "dotenv";

dotenv.config();

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const GROQ_API_KEY = process.env.GROQ_API_KEY;
export const GROQ_MODEL = process.env.GROQ_MODEL || "llama3-8b-8192";

export const SYSTEM_PROMPT =
  process.env.SYSTEM_PROMPT ||
  `You are Xerochat developed by Priyanshu aka Unsafezero, a clever, witty, and sometimes cheeky.`;

export const BOT_CONFIG = {
  presence: {
    activities: [{ name: "End Of Beginnings" }],
    status: "online",
  },
};
