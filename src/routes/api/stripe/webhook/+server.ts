import { type RequestEvent } from "@sveltejs/kit";
import { stripeClient } from "$lib/server/services/data/stripeClient";
import Stripe from "stripe";
import { STRIPE_WEBHOOK_SECRET } from "$env/static/private";
import * as subService from "$lib/server/services/application/subscriptionService";

export async function POST(
  { request }: RequestEvent,
): Promise<Response> {
  const body = await request.json();

  let event = body;
  const endpointSecret = STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return new Response(JSON.stringify({ error: "bad request" }), {
      status: 400,
    });
  }
  try {
    event = stripeClient.webhooks.constructEvent(
      body,
      signature,
      endpointSecret,
    );
  } catch (_err) {
    return new Response(JSON.stringify({ error: "bad request" }), {
      status: 400,
    });
  }

  let subscription: Stripe.Subscription;
  let checkoutSession: Stripe.Checkout.Session;
  let customerId = "";
  let subscriptionId = "";
  let yizyUserId = "";
  switch (event.type) {
    case "checkout.session.completed":
      checkoutSession = event.data.object;
      customerId = checkoutSession.customer as string;
      subscriptionId = checkoutSession.subscription as string;
      yizyUserId = checkoutSession.metadata?.userId ?? "";
      if (yizyUserId === "") {
        break;
      } else {
        await subService.createActiveSubscription({
          stripeSubscriptionId: subscriptionId,
          userId: yizyUserId,
          stripeId: customerId,
        });
      }
      break;
    case "customer.subscription.deleted":
      subscription = event.data.object;
      await subService.revokeSubscription(subscription.id);
      break;
    default:
      break;
  }
  return new Response(undefined, {
    status: 200,
  });
}
