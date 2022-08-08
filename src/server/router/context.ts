// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { prisma } from "../db/client";

export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => {
  const req = opts?.req;
  const res = opts?.res;

  const getUserFromAuthHeader = async (id: string) => {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  };
  const userId = opts?.req?.headers["authorization"] as string;
  const user = userId ? await getUserFromAuthHeader(userId) : undefined;

  console.log("cont", userId);
  console.log("cont user", user);

  return {
    req,
    res,
    prisma,
    user,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
