import type { VercelRequest, VercelResponse } from "@vercel/node";
import { OAuth2Client } from "google-auth-library";
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  signSession,
} from "../_lib/session.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const sessionSecret = process.env.SESSION_SECRET;

  if (!clientId || !sessionSecret) {
    console.error("Missing GOOGLE_CLIENT_ID or SESSION_SECRET");
    return res.status(500).json({ error: "Authentication is not configured" });
  }

  try {
    const credential =
      typeof req.body?.credential === "string" ? req.body.credential : "";

    if (!credential || credential.length > 10_000) {
      return res.status(400).json({ error: "Invalid credential" });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });

    const payload = ticket.getPayload();

    if (!payload?.sub || !payload.email || !payload.email_verified) {
      return res.status(401).json({ error: "Invalid user" });
    }

    const now = Math.floor(Date.now() / 1000);
    const expiresAt = now + SESSION_MAX_AGE_SECONDS;
    const session = signSession(
      {
        sub: payload.sub,
        email: payload.email,
        iat: now,
        exp: expiresAt,
      },
      sessionSecret
    );

    res.setHeader(
      "Set-Cookie",
      `${SESSION_COOKIE_NAME}=${session}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_MAX_AGE_SECONDS}`
    );
    res.setHeader("Cache-Control", "no-store");

    return res.status(200).json({
      user: {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      },
    });
  } catch (error) {
    console.error("Google authentication failed", error);
    return res.status(401).json({ error: "Authentication failed" });
  }
}
