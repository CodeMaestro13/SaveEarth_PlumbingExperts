import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { backendRequest, backendSessionCookieName } from "@/lib/backend-api";

const sessionMaxAgeSeconds = 60 * 60 * 8;

export async function createAdminSession(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(backendSessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionMaxAgeSeconds
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(backendSessionCookieName);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  if (!cookieStore.get(backendSessionCookieName)?.value) {
    return false;
  }

  try {
    await backendRequest("/auth/me", {}, true);
    return true;
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
  try {
    const result = await backendRequest<{ token: string }>("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    return result.token;
  } catch {
    return null;
  }
}
