import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/get-started(.*)"]);

const isMentorRoute = createRouteMatcher(["/mentor/dashboard(.*)"]);

const isStudentRoute = createRouteMatcher(["/student/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  if (isMentorRoute(req)) {
    const { sessionClaims } = await auth.protect();

    if (sessionClaims?.metadata?.role !== "mentor") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (isStudentRoute(req)) {
    const { sessionClaims } = await auth.protect();

    if (sessionClaims?.metadata?.role !== "student") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
