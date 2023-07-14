import { TrackInfo } from "@/util/TrackInfo";
import { HeaderUtil } from "@/util/headers";
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
'[L]' prefix presents user liked this track, you should recommend more tracks like this;
'[D]' presents user disliked this track, you should recommend fewer tracks like this.

Your replies should be exactly one record in the format 'ARTIST - TITLE', no '[L/D]' prefix, no other content is allowed.
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

  const maxTracks = parseInt(process.env.MAX_HISTORY_TRACKS ?? "20");
  if (queueArray.length > maxTracks) {
    queueArray.splice(maxTracks, queueArray.length - maxTracks);
  }

  const ip = HeaderUtil.getIpAddress(req);
  if (ip == null) {
    return NextResponse.json({ ok: false, message: "?" });
  }

  const port = new URL(req.url).port;

  // Request new new request
  const requestResult = await callInternalApi({
    port: port,
    action: "request",
    body: { ip: ip },
  });
  if (requestResult.ok !== true) {
    return NextResponse.json(requestResult);
  }

  try {
    const response = await openai.createChatCompletion({
      model: process.env.OPENAI_MODEL ?? "gpt-3.5-turbo",
      stream: true,
      temperature: 1.5,
      presence_penalty: 1,
      frequency_penalty: 1,
      messages: buildMessages(queueArray),
    });
    const stream = OpenAIStream(response);
    const text = await new StreamingTextResponse(stream).text();

    // Save the request record
    await callInternalApi({
      port: port,
      action: "add-record",
      body: { ip: ip },
    });

    return NextResponse.json({ ok: true, data: responseTextToTrack(text) });
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

function responseTextToTrack(text: string): TrackInfo {
  const separator = " - ";
  const separatorAt = text.indexOf(separator);
  if (separatorAt === -1) {
    return { title: text, artist: "" };
  }
  return {
    title: text.substring(separatorAt + separator.length),
    artist: text.substring(0, separatorAt),
  };
}

async function callInternalApi({
  port,
  action,
  body,
}: {
  port: string;
  action: "request" | "add-record";
  body: any;
}) {
  const baseUrl =
    process.env.INTERNAL_API_BASE_URL +
    (port != null && port.length > 0 ? `:${port}` : "");
  try {
    return await fetch(`${baseUrl}/api/next-track/calls`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.INTERNAL_API_CALL_TOKEN}`,
      },
      body: JSON.stringify({
        action: action,
        ...body,
      }),
    }).then((res) => res.json());
  } catch (e) {
    console.log("Failed to call internal api:", e);
    return { ok: false, message: "Internal error: Failed to request." };
  }
}
