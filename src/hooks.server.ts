import { dev } from "$app/environment";
import { validateSessionToken } from "$lib/server/services/data/db/dbService";
import { type Handle, json, type RequestEvent } from "@sveltejs/kit";

export function setSessionTokenCookie(
  event: RequestEvent,
  token: string,
  expiresAt: Date,
): void {
  if (dev) {
    event.cookies.set("sessionToken", token, {
      httpOnly: false,
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });
  } else {
    event.cookies.set("sessionToken", token, {
      httpOnly: true,
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });
  }
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
  if (dev) {
    event.cookies.set("sessionToken", "", {
      httpOnly: false,
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });
  } else {
    event.cookies.set("sessionToken", "", {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });
  }
}

function isApiRoute(url: string) {
  return url.toString().includes("/api") &&
    !url.toString().includes("/api/auth");
}

function isStripeWebhook(url: string) {
  return url.toString().includes("/api/stripe/webhook");
}

export const handle: Handle = async ({ event, resolve }) => {
  if (isStripeWebhook(event.url.toString())) {
    return resolve(event);
  }

  const url = event.url.toString();
  const token = event.cookies.get("sessionToken") ?? null;
  if (token === null) {
    if (isApiRoute(url)) {
      event.locals.authState = null;
      const res: Response = json({ error: "unauthenticated" }, {
        status: 401,
      });
      return res;
    } else {
      event.locals.authState = null;
      return resolve(event);
    }
  }

  const res = await validateSessionToken(token);

  if (isApiRoute(url)) {
    if (!res) {
      const res: Response = json({ error: "unauthenticated" }, {
        status: 401,
      });
      event.locals.authState = null;
      return res;
    } else {
      event.locals.authState = res;
      return resolve(event);
    }
  } else {
    if (res != null) {
      setSessionTokenCookie(event, token, res.session.expiresAt);
    } else {
      deleteSessionTokenCookie(event);
    }
    event.locals.authState = res;
    return resolve(event);
  }
};
