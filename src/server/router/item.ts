import * as trpc from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const itemRouter = createRouter()
  .query("list-own", {
    async resolve(req) {
      const userId = req.ctx.req?.headers["authorization"] as string;
      return await req.ctx.prisma.item.findMany({
        where: {
          ownerId: userId,
        },
      });
    },
  })
  .mutation("create", {
    input: z.object({ title: z.string().min(1).max(255) }),
    async resolve(req) {
      const ownerId = req.ctx.req?.headers.authorization?.replaceAll('"', "");
      const user = await req.ctx.prisma.user.findUnique({
        where: {
          id: ownerId,
        },
      });
      if (!user) {
        throw new trpc.TRPCError({
          message: `cannot find user with header auth id: ${ownerId}`,
          code: "BAD_REQUEST",
        });
      } else {
        return req.ctx.prisma.item.create({
          data: {
            ownerId: user.id,
            ...req.input,
          },
        });
      }
    },
  })
  .mutation("transfer", {
    input: z.object({
      toUserId: z.string(),
      itemId: z.string(),
    }),
    async resolve(req) {
      const ownerId = req.ctx.req?.headers.authorization?.replaceAll('"', "");
      const user = await req.ctx.prisma.user.findUnique({
        where: {
          id: ownerId,
        },
      });
      if (!user) {
        throw new trpc.TRPCError({
          message: `cannot find user with header auth id: ${ownerId}`,
          code: "BAD_REQUEST",
        });
      } else {
        const changeOwner = await req.ctx.prisma.item.update({
          where: {
            id: req.input.itemId,
          },
          data: {
            ownerId: req.input.toUserId,
          },
        });

        const registerTransfer = await req.ctx.prisma.itemTransfer.create({
          data: {
            fromUserId: user.id,
            ...req.input,
          },
        });
      }
    },
  });
