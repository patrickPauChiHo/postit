import { PrismaClient } from "@prisma/client";

const client = globalThis.client || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.client = client;

export default client;
