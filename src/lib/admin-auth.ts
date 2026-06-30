import "server-only";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, timingSafeEqual } from "node:crypto";

const sessionCookieName = "save-earth-admin-session";
const sessionMaxAgeSeconds = 60 * 60 * 8;

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD_HASH || "change-this-secret";
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

function isValidSignature(value: string, signature: string) {
  const expected = Buffer.from(sign(value));
  const actual = Buffer.from(signature);

  if (expected.length !== actual.length) {
    return false;
  }

  return timingSafeEqual(expected, actual);
}

export async function createAdminSession() {
  const expiresAt = Date.now() + sessionMaxAgeSeconds * 1000;
  const payload = Buffer.from(JSON.stringify({ expiresAt })).toString("base64url");
  const cookieStore = await cookies();

  cookieStore.set(sessionCookieName, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionMaxAgeSeconds
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookieName);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(sessionCookieName)?.value;

  if (!cookie) {
    return false;
  }

  const [payload, signature] = cookie.split(".");

  if (!payload || !signature || !isValidSignature(payload, signature)) {
    return false;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      expiresAt?: number;
    };
    return typeof session.expiresAt === "number" && session.expiresAt > Date.now();
  } catch {
    return false;
  }
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}

export async function validateAdminCredentials(username: string, password: string) {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const plainPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUsername || username !== expectedUsername) {
    return false;
  }

  if (passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  return Boolean(plainPassword && password === plainPassword);
}
