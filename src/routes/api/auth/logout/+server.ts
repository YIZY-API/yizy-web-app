import type { RequestEvent } from "@sveltejs/kit";
import * as authService from "$lib/server/services/application/authService";

export async function GET(event: RequestEvent): Promise<Response> {
  if (event.cookies.get("sessionToken")) {
    await authService.logout(event.cookies.get("sessionToken")!);
  }

  const res = new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });

  const date = new Date("1969-12-28");
  res.headers.set(
    "Set-Cookie",
    `sessionToken=; HttpOnly; SameSite=Lax; Expires=${date.toUTCString()}; Path=/; Secure;`,
  );
  return res;
}
