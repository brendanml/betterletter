// open_test.ts           ← switched to .ts so TypeScript syntax is legal
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

/* ---------- type helpers ---------- */
interface CoverLetterStructure {
  introParagraph: string;
  middleParagraph: string;
  endParagraph: string;
  signOff: string;
}

interface OpenAIInstructions {
  structure: CoverLetterStructure;
  tone: string;
  length: string;
  userRequests?: string;
  rules?: string; // e.g., "hyphen character (-), bullet points, and emojis"
}

export interface CoverLetterParams {
  resume: string
  jobDescription: string
  userRequests?: string
}

const coverLetterWords = `adapt, aligned, analyze, apply, assist, attention, available, background, build, capable, clarity, collaborate, commitment, communicate, complete, confident, connect, consistency, contribute, convert, coordinate, create, curiosity, data, decide, define, deliver, dependable, detail, develop, direction, discipline, discover, driven, eager, effort, efficient, empathetic, empower, enable, engage, enhance, ensure, establish, evaluate, exceed, execute, experience, explain, explore, express, feedback, focus, follow, foundation, gain, goal, grow, handle, helpful, honest, idea, identify, impact, improve, include, influence, initiative, innovate, insight, integrity, interest, join, judgment, key, knowledge, learn, listen, maintain, manage, meaningful, method, metrics, mission, motivate, need, objective, observe, offer, open, organize, outcome, output, participate, partner, patience, perform, plan, practical, prepare, present, prioritize, problem, process, produce, progress, project, proof, provide, qualify, question, reach, ready, reason, reduce, reflect, reliable, report, request, require, research, resolve, resourceful, result, retain, return, role, schedule, scope, secure, seek, select, self-driven, share, skill, solve, source, specific, stable, standard, start, strategy, strength, streamline, structure, succeed, support, swift, system, tackle, take, task, team, thoughtful, timeline, tool, track, train, transfer, transition, transparent, trust, understand, update, use, value, verify, view, vision, willing, win, work, worth, write, yield`;

// const coverLetterLanguage = {
//   words: [
//     "adapt", "align", "analyze", "apply", "assist", "build", "clarify", "collaborate", "communicate", "complete",
//     "confident", "contribute", "coordinate", "create", "curious", "data", "deliver", "dependable", "detail", "develop",
//     "disciplined", "discover", "drive", "eager", "efficient", "empathize", "empower", "engage", "enhance", "ensure",
//     "evaluate", "execute", "experience", "explain", "explore", "express", "feedback", "focus", "follow", "gain",
//     "goal", "grow", "handle", "honest", "identify", "impact", "improve", "include", "influence", "initiative",
//     "innovate", "insight", "integrity", "interest", "join", "knowledge", "learn", "listen", "maintain", "manage",
//     "method", "metrics", "motivate", "observe", "offer", "organize", "outcome", "participate", "partner", "perform",
//     "plan", "practical", "prepare", "present", "prioritize", "problem", "process", "produce", "progress", "project",
//     "provide", "qualify", "question", "ready", "reason", "reduce", "resolve", "results", "role", "schedule", "seek",
//     "skill", "solve", "start", "strategy", "strength", "structure", "succeed", "support", "system", "value"
//   ],
// phrases: [
//   "strong understanding of",
//   "able to deliver results",
//   "hands-on experience with",
//   "keen attention to detail",
//   "clear and concise communication",
//   "committed to quality work",
//   "solve problems effectively",
//   "work well under pressure",
//   "driven by learning and growth",
//   "ready to contribute immediately"
// ]
// };



/* ---------- main function ---------- */
export const generateCoverletter = async (
  params: CoverLetterParams
) => {
  const { resume, jobDescription, userRequests } = params;

  const instructions: OpenAIInstructions = {
    structure: {
      introParagraph:
        "2 sentences.",
      middleParagraph:
        "overlap between job description and resume, 4-6 sentences. Don't directly quote the resume or job description, but rather summarize the key points that align with the job requirements.",
      endParagraph:
        "2 sentences summarizing the applicant's fit for the role and expressing enthusiasm.",
      signOff: "Sincerely, Brendan Lynch"
    },
    tone: "Make it sound non-robotic and human. Slightly playful but professional.",
    length: "8-12 sentences",
    rules: `Write a cover letter for this job and resume. Engagement is the highest priority. Be conversational & empathetic. Ensure heterogeneous paragraphs. Ensure heterogeneous sentence lengths. And stick to primarily short, straightforward sentences. Strictly follow this requirement: your response should not include any of the following words and phrases: meticulous, meticulously, navigating, complexities, realm, understanding, dive, shall, tailored, towards, underpins, everchanging, ever-evolving, the world of, not only, alright, embark, Journey, In today's digital age, hey, game changer, designed to enhance, it is advisable, daunting, when it comes to, in the realm of, amongst, unlock the secrets, unveil the secrets, and robust, diving, elevate, unleash, power, cutting-edge, rapidly, expanding, mastering, excels, harness. Include occasioan minor grammatical errors, typos, and spelling mistakes to make it sound more human. Exclude all of these: ${coverLetterWords}`,
    userRequests
  };

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set in environment variables");
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // modern Chat Completions endpoint
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-2025-04-14",             // replace with your available model
    messages: [
      {
        role: "system",
        content: JSON.stringify(instructions)
      },
      {
        role: "user",
        content: `Job description:${jobDescription}\n\nApplicant:${resume}\n\nUser requests:${userRequests ?? ""}`
      }
    ]
  });

  return response.choices[0].message?.content ?? "";
};


import { jsonCandidateProfile } from "../models/applicantProfileModel";

// const createCandidateProfile = (resumeText: string) => {
//   return resumeText
// }



export const generateCandidateProfileObject = async (
  resume: string
) => {

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set in environment variables");
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // modern Chat Completions endpoint
  const response = await openai.responses.create({
    model: "gpt-4.1-2025-04-14",             // replace with your available model
    input: [
      {
        role: "system",
        content: `You are an expert in creating candidate profiles based on resumes. Your task is to create a candidate profile object based on the resume text provided. The profile should be this structure + ${JSON.stringify(jsonCandidateProfile)}`
      },
      {
        role: "user",
        content: `Resume text:${resume}`
      }
    ]
  });

  return response.output_text

}