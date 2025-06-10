import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const openApiRoutes = [
  "/api/v1/anime",
  "/api/v1/anime/"
];

export default clerkMiddleware((auth, req: NextRequest) => {
  const { pathname } = req.nextUrl;
  if (pathname === "/api/v1/anime" || pathname.startsWith("/api/v1/anime/")) {
    return NextResponse.next();
  }
  // Clerk protegerá el resto automáticamente
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/(api|trpc)(.*)"
  ]
};