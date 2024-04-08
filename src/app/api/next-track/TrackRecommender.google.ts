import { TrackInfo } from "@/util/TrackInfo";
import { Content, GoogleGenerativeAI } from "@google/generative-ai";
import {
  MODEL_SYSTEM_PROMPT,
  TrackRecommender,
  responseTextToTrack,
} from "./TrackRecommender";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_API_KEY || "");

export class GoogleGenAITrackRecommender implements TrackRecommender {
  async next(queue: TrackInfo[]): Promise<TrackInfo> {
    const result = await genAI
      .getGenerativeModel({
        model: process.env.GOOGLE_GEN_AI_MODEL ?? "gemini-pro",
      })
      .generateContent({ contents: buildMessages(queue) });
    return responseTextToTrack(result.response.text());
  }
}

function buildMessages(queue: TrackInfo[]): Content[] {
  let queueString = queue
    .map((track) => {
      let prefix: string;
      if (track.liked) {
        prefix = "[L]";
      } else if (track.disliked) {
        prefix = "[D]";
      } else {
        prefix = "";
      }
      return `${prefix}${track.artist} - ${track.title}`;
    })
    .join("\n");

  const messages: Content[] = [
    {
      role: "user",
      parts: [{ text: `System: ${MODEL_SYSTEM_PROMPT}` }],
    },
    {
      role: "model",
      parts: [{ text: "Okay, I understood." }],
    },
    { role: "user", parts: [{ text: queueString }] },
  ];

  return messages;
}
