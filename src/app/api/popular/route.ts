// GET
// https://api.themoviedb.org/3/movie/popular?api_key=6f26fd536dd6192ec8a57e94141f8b20

import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=6f26fd536dd6192ec8a57e94141f8b20"
  ).then((res) => res.json());

  return NextResponse.json({ res });
}
