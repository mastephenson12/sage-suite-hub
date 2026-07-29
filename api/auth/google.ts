import type { VercelRequest, VercelResponse } from "@vercel/node";
import { OAuth2Client } from "google-auth-library";
import crypto from "crypto";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function base64url(input: string): string {
  return Buffer.from(input).toString("base64url");
}

function signSession(payload: Record<string, unknown>, secret: string): string {
  const encoded = base64url(JSON.stringify(payload));
  const signature = crypto
    .createHmac("sha256", secret)
    .update(encoded)
    .digest("base64url");

  return `${encoded}.${signature}`;
}

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
    const expiresAt = now + 60 * 60 * 24 * 30;
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
      `sage_session=${session}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`
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
