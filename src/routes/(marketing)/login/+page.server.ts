import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  return {
    postLoginPath: url.searchParams.get("postLoginPath"),
  };
};
