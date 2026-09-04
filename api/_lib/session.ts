import crypto from "crypto";

export const SESSION_COOKIE_NAME = "sage_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export type SessionPayload = {
  sub: string;
  email: string;
  iat: number;
  exp: number;
};

function base64url(input: string): string {
  return Buffer.from(input).toString("base64url");
}

function sessionSignature(encodedPayload: string, secret: string): Buffer {
  return crypto.createHmac("sha256", secret).update(encodedPayload).digest();
}

export function signSession(payload: SessionPayload, secret: string): string {
  const encodedPayload = base64url(JSON.stringify(payload));
  const signature = sessionSignature(encodedPayload, secret).toString("base64url");

  return `${encodedPayload}.${signature}`;
}

export function readCookie(cookieHeader: string, name: string): string | null {
  for (const part of cookieHeader.split(";")) {
    const separator = part.indexOf("=");
    if (separator === -1) continue;

    const cookieName = part.slice(0, separator).trim();
    if (cookieName !== name) continue;

    return part.slice(separator + 1).trim() || null;
  }

  return null;
}

export function verifySession(
  token: string,
  secret: string,
  now = Math.floor(Date.now() / 1000)
): SessionPayload | null {
  if (!token || token.length > 4096) return null;

  const parts = token.split(".");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;

  const [encodedPayload, encodedSignature] = parts;

  let suppliedSignature: Buffer;
  try {
    suppliedSignature = Buffer.from(encodedSignature, "base64url");
  } catch {
    return null;
  }

  const expectedSignature = sessionSignature(encodedPayload, secret);
  if (
    suppliedSignature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(suppliedSignature, expectedSignature)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as Partial<SessionPayload>;

    if (
      typeof payload.sub !== "string" ||
      !payload.sub ||
      typeof payload.email !== "string" ||
      !payload.email ||
      !Number.isInteger(payload.iat) ||
      !Number.isInteger(payload.exp)
    ) {
      return null;
    }

    const issuedAt = payload.iat as number;
    const expiresAt = payload.exp as number;
    if (
      issuedAt > now + 60 ||
      expiresAt <= now ||
      expiresAt <= issuedAt ||
      expiresAt - issuedAt > SESSION_MAX_AGE_SECONDS
    ) {
      return null;
    }

    return payload as SessionPayload;
  } catch {
    return null;
  }
}
