import { redirect, type RequestEvent } from "@sveltejs/kit";
import { stripeClient } from "$lib/server/services/data/stripeClient";
import { DOMAIN } from "$env/static/private";

export async function POST(
  { locals }: RequestEvent,
): Promise<Response> {
  if (!locals.authState?.user.email) {
    return new Response(undefined, { status: 401 });
  }
  const customerEmail = locals.authState?.user.email;
  const session = await stripeClient.checkout.sessions.create({
    billing_address_collection: "auto",
    line_items: [
      {
        price: "price_1QhucLEAz7NBJIGc3cEywC7q",
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: DOMAIN + `/upgrade?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: DOMAIN + `/stripe/cancel`,
    client_reference_id: "1",
    customer_email: customerEmail,
    metadata: {
      userId: locals.authState.user.uuid,
    },
  });
  redirect(303, session.url ?? "/");
}
