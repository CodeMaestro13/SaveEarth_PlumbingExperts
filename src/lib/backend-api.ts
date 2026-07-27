import "server-only";
import { cookies } from "next/headers";

export const backendSessionCookieName = "save-earth-backend-session";

export function getBackendApiUrl() {
  const url = process.env.BACKEND_API_URL;
  if (!url) {
    throw new Error("BACKEND_API_URL is required.");
  }
  return url.replace(/\/$/, "");
}

export function getBackendAssetUrl(path: string) {
  const api = new URL(getBackendApiUrl());
  const basePath = api.pathname
    .replace(/\/index\.php\/api\/?$/, "")
    .replace(/\/api\/?$/, "");
  return `${api.origin}${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function backendRequest<T>(
  path: string,
  init: RequestInit = {},
  admin = false
): Promise<T> {
  const headers = new Headers(init.headers);

  if (admin) {
    const cookieStore = await cookies();
    const token = cookieStore.get(backendSessionCookieName)?.value;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(`${getBackendApiUrl()}${path}`, {
    ...init,
    headers,
    signal: init.signal ?? AbortSignal.timeout(15000),
    cache: "no-store"
  });
  const text = await response.text();
  let data: any;

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Backend returned an invalid response (${response.status}).`);
  }

  if (!response.ok) {
    throw new Error(data.error || `Backend request failed (${response.status}).`);
  }

  return data as T;
}
