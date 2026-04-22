import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const cookie = req.headers.cookie || "";

  if (!cookie.includes("sage_session")) {
    return res.status(401).json({ user: null });
  }

  // later: validate session in DB
  return res.status(200).json({
    user: { loggedIn: true },
  });
}
