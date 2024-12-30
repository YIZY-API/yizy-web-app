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

export async function getSpecs(userId: string) {
  const user = await prisma.user.findFirst({
    where: {
      uuid: userId,
    },
  });

  if (!user) {
    return [];
  }

  const bridge = await prisma.bridgeUserAndSpecfication.findMany({
    where: {
      userId: user?.id,
    },
  });

  const specs = await prisma.specification.findMany({
    where: {
      id: {
        in: bridge.flatMap((b) => b.specId),
      },
    },
  });
  return specs;
}

export async function createSpec(
  name: string,
  userId: string,
) {
  const user = await prisma.user.findFirst({
    where: {
      uuid: userId,
    },
  });

  if (!user) {
    return null;
  }

  const res = await prisma.$transaction(async (tx) => {
    const spec = await tx.specification.create({
      data: {
        name: name,
        uuid: crypto.randomUUID(),
      },
    });
    const uuid = crypto.randomUUID();

    await tx.specificationSnapshot.create({
      data: {
        specId: spec.id,
        uuid: uuid,
        versionNum: 0,
        content: "",
        creatorId: user.id,
        prevSnapshotId: "genesis-" + uuid,
      },
    });

    await tx.bridgeUserAndSpecfication.create({
      data: {
        specId: spec.id,
        userId: user.id,
      },
    });

    return {
      name: name,
      id: spec.uuid,
      version: "v0",
    };
  });

  return res;
}

export async function updateSpec(
  specId: string,
  prevSnapshotId: string,
  content: string,
  userId: string,
) {
  const user = await prisma.user.findFirst({ where: { uuid: userId } });
  if (!user) return null;

  const spec = await prisma.specification.findFirst({
    where: { uuid: specId },
  });
  if (!spec) return null;

  console.log("cp1");
  const res = await prisma.$transaction(async (tx) => {
    console.log("cp2");
    const prevSnapshot = await tx.specificationSnapshot.findFirst({
      where: {
        uuid: prevSnapshotId,
      },
    });
    if (!prevSnapshot) {
      return null;
    }

    console.log("cp3");
    const result = await tx.specificationSnapshot.create({
      data: {
        prevSnapshotId: prevSnapshotId,
        versionNum: prevSnapshot?.versionNum + 1,
        content: content,
        creatorId: user.id,
        specId: spec.id,
        uuid: crypto.randomUUID(),
      },
    });

    return {
      content: content,
      versionNum: result.versionNum,
      prevSnapshotId: result.uuid,
    };
  });
  return res;
}

export async function getLatestSpecSnapshotBySpecId(specId: string) {
  const spec = await prisma.specification.findFirst({
    where: {
      uuid: specId,
    },
  });

  if (!spec) {
    return null;
  }

  const snapshot = await prisma.specificationSnapshot.findFirst({
    where: {
      specId: spec.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!snapshot) {
    return null;
  }

  return {
    snapshotId: snapshot.uuid,
    version: snapshot.versionNum,
    name: spec.name,
    content: snapshot.content,
  };
}