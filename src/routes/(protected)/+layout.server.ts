import { redirect, type RequestEvent } from "@sveltejs/kit";
import { validateSessionToken } from "$lib/server/services/data/dbService";
//import { type RequestEvent } from "@sveltejs/kit";

export async function load({ cookies }: RequestEvent): Promise<void> {
  // redirect to login page if user is not logged in
  //console.log(cookies.getAll());
  if (!cookies.get("sessionToken")) {
    redirect(303, `/register?mode=login`);
  } else {
    const res = await validateSessionToken(cookies.get("sessionToken") ?? "");
    if (res.session != null) {
      return;
    } else {
      redirect(303, `/register?mode=login`);
    }
  }
}
