import { NextResponse } from "next/server";

import episodes from "./database.json";

export function GET() {
  return NextResponse.json(episodes);
}
