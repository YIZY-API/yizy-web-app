import * as dbService from "../data/db/subscriptionService";

export interface NewActiveSubscription {
  userId: string;
  stripeId: string;
  stripeSubscriptionId: string;
}

export async function createActiveSubscription(sub: NewActiveSubscription) {
  await dbService.createActiveSubscription(sub);
}

export async function revokeSubscription(stripeSubscriptionId: string) {
  await dbService.revokeSubscription(stripeSubscriptionId);
}

export async function getSubscriptionWithUserId(userId: string) {
  const sub = await dbService.getSubscriptionByUserId(userId);
  if (sub === null) return null;
  return {
    stripeUserId: sub.stripeId,
    subscriptionId: sub.stripeSubscriptionId,
  };
}
