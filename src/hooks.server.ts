import { validateSessionToken } from "$lib/server/services/data/dbService";
import type { Handle, RequestEvent } from "@sveltejs/kit";

export function setSessionTokenCookie(
  event: RequestEvent,
  token: string,
  expiresAt: Date,
): void {
  event.cookies.set("sessionToken", token, {
    httpOnly: true,
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
  event.cookies.set("sessionToken", "", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get("sessionToken") ?? null;
  if (token === null) {
    event.locals.authState = null;
    return resolve(event);
  }

  const res = await validateSessionToken(token);
  if (res != null) {
    setSessionTokenCookie(event, token, res.session.expiresAt);
  } else {
    deleteSessionTokenCookie(event);
  }
  event.locals.authState = res;
  return resolve(event);
};
