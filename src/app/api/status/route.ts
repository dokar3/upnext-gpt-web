import { NextResponse } from "next/server";

const statusMessage = `
Using '${process.env.OPENAI_MODEL}',
${process.env.MAX_REQUESTS_PER_MINUTE_PER_IP} requests / minute, ${process.env.MAX_REQUESTS_PER_DAY_PER_IP} requests / day.
`.trim();

export async function POST(req: Request) {
  return NextResponse.json({ ok: true, message: statusMessage });
}
