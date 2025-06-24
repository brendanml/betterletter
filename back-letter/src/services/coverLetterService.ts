// open_test.ts           ← switched to .ts so TypeScript syntax is legal
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

/* ---------- type helpers ---------- */
interface CoverLetterStructure {
  introduction: string;
  body: string;
  conclusion: string;
  signOff: string;
}

interface OpenAIInstructions {
  structure: CoverLetterStructure;
  tone: string;
  length: string;
  userRequests?: string;
  exclude?: string; // e.g., "hyphen character (-), bullet points, and emojis"
  include?: string; // e.g., "include specific skills or experiences"
}

export interface CoverLetterParams {
  resume: string
  jobDescription: string
  userRequests?: string
}

/* ---------- main function ---------- */
export const generateCoverletter = async (
  params: CoverLetterParams
) => {
  const { resume, jobDescription, userRequests } = params;

  const instructions: OpenAIInstructions = {
    structure: {
      introduction:
        "First paragraph (2 sentences): Start with I came across <Job or position> and hold a degree in computer science (include month and year) and my ability to commute to location, or im familiar that it's remote if thats the case.",
      body:
        "Middle paragraph: My technical and non technical experience overlap with the job posting",
      conclusion:
        "finishing with couple sentences about an eagerness to connect and discuess the role.",
      signOff: "Sincerely, Brendan Lynch"
    },
    tone: "Make it sound not AI generated. Make it sound like a 15 year old wrote it. Use normal regular, common words.",
    length: "10-12 sentences",
    exclude: "hyphen charcter (-), bullet points, and emojis, filler words. Don't start sentences with 'with my...",
    // Optional user requests to customize the cover letter
    include: "Mention any overlap of technical skills between me and the job description. Be as concise as possible. Exclude all filler words. Use normal regular, common words.",
    userRequests
  };

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set in environment variables");
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // modern Chat Completions endpoint
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-nano-2025-04-14",             // replace with your available model
    messages: [
      {
        role: "system",
        content: JSON.stringify(instructions)
      },
      {
        role: "user",
        content: `${jobDescription}\n\n${resume}\n\n${userRequests ?? ""}`
      }
    ]
  });

  return response.choices[0].message?.content ?? "";
};
