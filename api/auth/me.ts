import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  readCookie,
  SESSION_COOKIE_NAME,
  verifySession,
} from "../_lib/session.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    console.error("Missing SESSION_SECRET");
    return res.status(500).json({ error: "Authentication is not configured" });
  }

  const token = readCookie(req.headers.cookie || "", SESSION_COOKIE_NAME);
  const session = token ? verifySession(token, sessionSecret) : null;

  if (!session) {
    if (token) {
      res.setHeader(
        "Set-Cookie",
        `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`
      );
    }
    return res.status(401).json({ user: null });
  }

  return res.status(200).json({
    user: {
      id: session.sub,
      email: session.email,
      loggedIn: true,
    },
  });
}
