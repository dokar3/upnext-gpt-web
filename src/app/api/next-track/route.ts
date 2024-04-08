import { TrackInfo } from "@/util/TrackInfo";
import { HeaderUtil } from "@/util/headers";
import { NextResponse } from "next/server";
import { GoogleGenAITrackRecommender } from "./TrackRecommender.google";
import { OpenAITrackRecommender } from "./TrackRecommender.openai";

export const runtime = "edge";

const trackRecommender =
  process.env.MODEL_PROVIDER === "google"
    ? new GoogleGenAITrackRecommender()
    : new OpenAITrackRecommender();

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
    const nextTrack = trackRecommender.next(queueArray);
    // Save the request record
    await callInternalApi({
      port: port,
      action: "add-record",
      body: { ip: ip },
    });
    return NextResponse.json({ ok: true, data: nextTrack });
  } catch (e) {
    console.error("Cannot get next track:", e);
    return NextResponse.json({
      ok: false,
      message: "Cannot get next track now.",
    });
  }
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
