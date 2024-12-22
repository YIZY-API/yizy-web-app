import { PrismaClient } from "@prisma/client";
import { DATABASE_URL } from "$env/static/private";

// this is a cached singleton according to prisma documentation
// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prismaclient-in-long-running-applications
export const prisma = new PrismaClient({
  datasourceUrl: DATABASE_URL,
});
