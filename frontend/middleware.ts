export { default } from "next-auth/middleware";

// Protect these routes
export const config = {
  matcher: ["/user/:path*", "/property/new"],
};
