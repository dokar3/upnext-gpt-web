import { NextResponse } from "next/server";

const model =
  process.env.MODEL_PROVIDER === "google"
    ? process.env.GOOGLE_GEN_AI_MODEL
    : process.env.OPENAI_MODEL;

const statusMessage = `
Using '${model}',
${process.env.MAX_REQUESTS_PER_MINUTE_PER_IP} requests / minute, ${process.env.MAX_REQUESTS_PER_DAY_PER_IP} requests / day.
`.trim();

export async function POST(req: Request) {
  return NextResponse.json({ ok: true, message: statusMessage });
}
