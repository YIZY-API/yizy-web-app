import { decodeIdToken } from "arctic";
import * as authService from "$lib/server/services/application/authService";
import { dev } from "$app/environment";

import type { RequestEvent } from "@sveltejs/kit";
import type { OAuth2Tokens } from "arctic";

export async function GET(event: RequestEvent): Promise<Response> {
  const code = event.url.searchParams.get("code");
  const state = event.url.searchParams.get("state");
  const storedState = event.cookies.get("google_oauth_state") ?? null;
  const codeVerifier = event.cookies.get("google_code_verifier") ?? null;
  if (
    code === null || state === null || storedState === null ||
    codeVerifier === null
  ) {
    return new Response(null, {
      status: 400,
    });
  }
  if (state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  let tokens: OAuth2Tokens;
  try {
    tokens = await authService.google.validateAuthorizationCode(
      code,
      codeVerifier,
    );
  } catch (_e) {
    return new Response(null, {
      status: 400,
    });
  }
  // eslint-disable-next-line
  const claims: any = decodeIdToken(tokens.idToken());
  const googleUserId: string | null = claims.sub ?? null;
  const username: string = claims.name ?? "";
  const email: string | null = claims.email ?? null;

  if (!googleUserId || !email) {
    return new Response(null, {
      status: 400,
    });
  }

  const session = await authService.loginWithGoogle(
    googleUserId,
    email,
    username,
  );

  const res = new Response(null, {
    status: 302,
    headers: {
      Location: "/demo",
    },
  });

  if (!dev) {
    res.headers.set(
      "Set-Cookie",
      `sessionToken=${session.token}; HttpOnly; SameSite=Lax; Expires=${session.expiresAt.toUTCString()}; Path=/; Secure;`,
    );
  } else {
    res.headers.set(
      "Set-Cookie",
      `sessionToken=${session.token}; HttpOnly; SameSite=Lax; Expires=${session.expiresAt.toUTCString()}; Path=/`,
    );
  }
  return res;
}
