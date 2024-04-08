import { HttpStatus } from "@/util/HttpStatus";
import { NextResponse } from "next/server";
import { DateUtil } from "../../../../util/date";
import prisma from "../../../../../lib/prisma";

// Node runtime

export async function POST(req: Request) {
  const authToken = req.headers.get("authorization");
  if (authToken !== `Bearer ${process.env.INTERNAL_API_CALL_TOKEN}`) {
    return NextResponse.json(
      { ok: false },
      { status: HttpStatus.Unauthorized }
    );
  }

  const { ip, action } = await req.json();
  if (ip == null) {
    return NextResponse.json(
      { ok: false, message: "Require 'ip' field." },
      { status: HttpStatus.BadRequest }
    );
  }
  if (action == null) {
    return NextResponse.json(
      { ok: false, message: "Require 'action' field." },
      { status: HttpStatus.BadRequest }
    );
  }

  switch (action) {
    case "request":
      return newRequest(ip);
    case "add-record":
      return addRecord(ip);
    default:
      return NextResponse.json(
        {
          ok: false,
          message: `Unknown action '${action}'`,
        },
        { status: HttpStatus.BadRequest }
      );
  }
}

async function newRequest(ip: string): Promise<Response> {
  // Check the current day requests
  const [dayStart, dayEnd] = DateUtil.getStartAndEndOfDayMs();
  const dayRequests = await countNextTrackRequest({
    ip: ip,
    start: dayStart,
    end: dayEnd,
  });
  const maxPerDay = parseInt(process.env.MAX_REQUESTS_PER_DAY_PER_IP ?? "100");
  if (dayRequests >= maxPerDay) {
    return NextResponse.json(
      {
        ok: false,
        message: "You have ran out daily requests, please try tomorrow.",
      },
      { status: HttpStatus.TooManyRequest }
    );
  }

  // Check the current minute requests
  const [minuteStart, minuteEnd] = DateUtil.getCurrentMinuteBounds();
  const minuteRequests = await countNextTrackRequest({
    ip: ip,
    start: minuteStart,
    end: minuteEnd,
  });
  const maxPerMinute = parseInt(
    process.env.MAX_REQUESTS_PER_MINUTE_PER_IP ?? "5"
  );
  if (minuteRequests >= maxPerMinute) {
    return NextResponse.json(
      {
        ok: false,
        message: "Too frequently, please try later.",
      },
      { status: HttpStatus.TooManyRequest }
    );
  }

  return NextResponse.json({ ok: true });
}

async function addRecord(ip: string): Promise<Response> {
  await prisma.nextTrackRequest.create({
    data: { ip: ip, at: Date.now() },
  });
  return NextResponse.json({ ok: true });
}

async function countNextTrackRequest({
  ip,
  start,
  end,
}: {
  ip: string;
  start: number;
  end: number;
}): Promise<number> {
  return await prisma.nextTrackRequest.count({
    where: {
      AND: [
        {
          ip: ip,
        },
        {
          at: { gte: start, lte: end },
        },
      ],
    },
  });
}
