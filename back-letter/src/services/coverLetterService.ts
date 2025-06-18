// open_test.mjs

import OpenAI from "openai";

import dotenv from "dotenv";
dotenv.config();


// Load env variables

export const generateCoverletter = async (prompt: string) => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set in environment variables");
  }
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const response = await client.responses.create({
    model: "gpt-4.1-nano-2025-04-14",
    instructions: "Generate a cover letter based on the provided prompt.",
    input: prompt
  });

  return response.output_text;

};
