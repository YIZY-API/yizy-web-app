import { redirect } from "@sveltejs/kit";
import { type RequestEvent } from "@sveltejs/kit";
import { stripeClient } from "$lib/server/services/data/stripeClient";
import { DOMAIN } from "$env/static/private";
import * as subService from "$lib/server/services/application/subscriptionService";

export async function POST(
  { locals }: RequestEvent,
): Promise<Response> {
  const returnUrl = DOMAIN;

  if (locals.authState?.user.uuid !== null) {
    const sub = await subService.getSubscriptionWithUserId(
      locals.authState!.user.uuid,
    );
    if (sub === null) {
      return new Response(undefined, {
        status: 401,
      });
    }

    const portalSession = await stripeClient.billingPortal.sessions.create({
      customer: sub.stripeUserId,
      return_url: returnUrl,
    });
    redirect(303, portalSession.url);
  }

  return new Response(undefined, {
    status: 401,
  });
}
