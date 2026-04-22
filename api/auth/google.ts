import type { VercelRequest, VercelResponse } from "@vercel/node";
import { OAuth2Client } from "google-auth-library";
import crypto from "crypto";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: "Missing credential" });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email_verified) {
      return res.status(401).json({ error: "Invalid user" });
    }

    const user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };

    // 🔥 TEMP SESSION (replace later with DB)
    const session = crypto.randomBytes(32).toString("hex");

    res.setHeader(
      "Set-Cookie",
      `sage_session=${session}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`
    );

    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Auth failed" });
  }
}
