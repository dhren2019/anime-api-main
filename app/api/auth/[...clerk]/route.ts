import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "Authentication system is working" });
}

export async function POST() {
  return NextResponse.json({ status: "Authentication system is working" });
} 