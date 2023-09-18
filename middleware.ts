import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  afterAuth(auth, req) {
    if (!auth.userId) {
      const url = req.nextUrl.clone();
      if (url.pathname === "/login") {
        return;
      }
      url.pathname = "/";
      return NextResponse.rewrite(url);
    }
  },
  publicRoutes: ["/api/webhooks"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
