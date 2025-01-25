import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, url }) => {
  if (locals.authState?.user.isSubscribed === false) {
    return redirect(303, "/upgrade");
  }

  if (locals.authState === null) {
    return redirect(303, "/login?postLoginPath=" + encodeURI(url.pathname));
  }
};
