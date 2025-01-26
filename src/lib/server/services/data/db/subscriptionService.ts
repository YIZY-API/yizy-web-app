import type { StripeSubscription, User } from "@prisma/client";
import { prisma } from "./prismaClient";
import { randomUUID } from "crypto";

export interface NewActiveSubscription {
  userId: string;
  stripeId: string;
  stripeSubscriptionId: string;
}

export async function createActiveSubscription(sub: NewActiveSubscription) {
  const user: User | null = await prisma.user.findFirstOrThrow({
    where: {
      uuid: sub.userId,
    },
  });

  if (user === null) {
    throw new Error("no user found");
  }

  const existingSub = await prisma.stripeSubscription.findFirst({
    where: {
      userId: user.id,
      active: true,
    },
  });

  if (existingSub !== null) {
    return;
  }

  await prisma.stripeSubscription.create({
    data: {
      uuid: randomUUID(),
      stripeSubscriptionId: sub.stripeSubscriptionId,
      stripeId: sub.stripeId,
      active: true,
      userId: user.id,
    },
  });
}

export async function revokeSubscription(stripeSubscriptionId: string) {
  await prisma.stripeSubscription.updateMany({
    data: {
      active: false,
    },
    where: {
      stripeSubscriptionId: stripeSubscriptionId,
    },
  });
}

export async function getSubscriptionByUserId(
  userId: string,
): Promise<StripeSubscription | null> {
  const user = await prisma.user.findFirst({
    where: {
      uuid: userId,
    },
  });
  if (user === null) return null;
  const res = await prisma.stripeSubscription.findFirst({
    where: {
      userId: user.id,
      active: true,
    },
  });
  return res;
}
