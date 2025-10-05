import fetch from "node-fetch";
import { GROQ_API_KEY, GROQ_MODEL, SYSTEM_PROMPT } from "../config.js";

/**
 * Send a message to the AI and get a response
 * @param {string} userMessage - The user's message
 * @returns {Promise<string>} - The AI's response
 */
export async function getAIResponse(userMessage) {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userMessage },
          ],
        }),
      }
    );

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No reply";
  } catch (error) {
    throw new Error(`AI service error: ${error.message || error}`);
  }
}
