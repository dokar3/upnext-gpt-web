import { TrackInfo } from "@/util/TrackInfo";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai-edge";

const SYSTEM_PROMPT = `
You are now a music recommender that generates new recommended tracks based on track history,

History tracks are in format '[L/D]ARTIST - TITLE';
'[L]' prefix presents user liked this track, you should recommend more track like this;
'[D]' presents user disliked this track, you should recommend less track like this.

Your replies should be in the format 'ARTIST - TITLE' format, no other content allowed.
`.trim();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(req: Request) {
  const json = await req.text();

  let body: any;
  try {
    body = JSON.parse(json);
  } catch (e) {
    console.error("Cannot parse request body:", e);
    return NextResponse.json({ ok: false, message: "Invalid request body." });
  }

  if (!Array.isArray(body.queue)) {
    return NextResponse.json({
      ok: false,
      message: "Require an array 'queue'.",
    });
  }

  const queueArray = body.queue as TrackInfo[];
  if (queueArray.length === 0) {
    return NextResponse.json({
      ok: false,
      message: "Require at least 1 track in 'queue'.",
    });
  }
  if (queueArray.length > 20) {
    queueArray.splice(0, queueArray.length - 20);
  }

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: false,
      messages: buildMessages(queueArray),
    });
    const stream = OpenAIStream(response);
    const textResponse = new StreamingTextResponse(stream);
    const text = await textResponse.text();
    return NextResponse.json({ ok: true, data: text });
  } catch (e) {
    console.error("Cannot get next track:", e);
    return NextResponse.json({
      ok: false,
      message: "Cannot get next track now.",
    });
  }
}

function buildMessages(queue: TrackInfo[]): ChatCompletionRequestMessage[] {
  const messages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
  ];

  for (const track of queue) {
    let prefix: string;
    if (track.liked) {
      prefix = "[L]";
    } else if (track.disliked) {
      prefix = "[D]";
    } else {
      prefix = "";
    }
    messages.push({
      role: "user",
      content: `${prefix}${track.artist} - ${track.title}`,
    });
  }

  return messages;
}
