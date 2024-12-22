import type { Session, User } from "@prisma/client";
import { prisma } from "./prismaClient";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;
const HALF_MONTH = ONE_MONTH / 2;

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(
  token: string,
  userId: number,
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    uuid: crypto.randomUUID(),
    userId,
    expiresAt: new Date(Date.now() + ONE_MONTH),
  };
  await prisma.session.create({
    data: session,
  });
  return session;
}

export type SessionValidationResult = {
  session: { uuid: string; expiresAt: Date };
  user: { username: string; email: string; uuid: string };
};

export async function validateSessionToken(
  token: string,
): Promise<SessionValidationResult | null> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });
  if (result === null) {
    return null;
  }
  const { user, ...session } = result;
  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({ where: { id: sessionId } });
    return null;
  }
  if (Date.now() >= session.expiresAt.getTime() - HALF_MONTH) {
    session.expiresAt = new Date(Date.now() + ONE_MONTH);
    await prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        expiresAt: session.expiresAt,
      },
    });
  }

  const sessionValidationResult: SessionValidationResult = {
    session: {
      uuid: session.uuid,
      expiresAt: session.expiresAt,
    },
    user: {
      uuid: user.uuid,
      email: user.email,
      username: user.username,
    },
  };

  return sessionValidationResult;
}

export async function removeSessionWithToken(token: string): Promise<void> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  await removeSession(sessionId);
}

export async function removeSession(sessionId: string): Promise<void> {
  await prisma.session.delete({ where: { id: sessionId } });
}

export interface NewUserDto {
  username: string;
  email: string;
  uuid: string;
  id: number;
}

export async function getOrCreateUser(
  username: string,
  email: string,
  googleId: string | null,
): Promise<NewUserDto> {
  const user: User | null = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    return {
      ...user,
    };
  } else {
    const res: User = await prisma.user.create({
      data: {
        username,
        email,
        uuid: crypto.randomUUID(),
        google_id: googleId,
      },
    });
    return {
      ...res,
    };
  }
}
