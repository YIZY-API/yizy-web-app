import { redirect, type RequestEvent } from "@sveltejs/kit";
import { stripeClient } from "$lib/server/services/data/stripeClient";
import { DOMAIN, STRIPE_INDIE_HACKER_PLAN_PRICE_ID } from "$env/static/private";

export async function POST(
  { locals }: RequestEvent,
): Promise<Response> {
  if (!locals.authState?.user.email) {
    return new Response(undefined, { status: 401 });
  }
  const session = await stripeClient.checkout.sessions.create({
    customer: locals.authState.user.stripeId,
    billing_address_collection: "auto",
    line_items: [
      {
        price: STRIPE_INDIE_HACKER_PLAN_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: DOMAIN + `/upgrade?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: DOMAIN + `/stripe/cancel`,
    client_reference_id: "1",
    metadata: {
      userId: locals.authState.user.uuid,
    },
  });
  redirect(303, session.url ?? "/");
}
