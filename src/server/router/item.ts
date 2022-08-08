import { z } from "zod";
import { createProtectedRouter } from "./util";

export const itemRouter = createProtectedRouter()
  .query("list-own", {
    async resolve(req) {
      return await req.ctx.prisma.item.findMany({
        where: {
          ownerId: req.ctx.user.id,
        },
      });
    },
  })
  .mutation("create", {
    input: z.object({ title: z.string().min(1).max(255) }),
    async resolve(req) {
      return req.ctx.prisma.item.create({
        data: {
          ownerId: req.ctx.user.id,
          ...req.input,
        },
      });
    },
  })
  .mutation("transfer", {
    input: z.object({
      toUserId: z.string(),
      itemId: z.string(),
    }),
    async resolve(req) {
      const changeOwner = await req.ctx.prisma.item.update({
        where: {
          id: req.input.itemId,
        },
        data: {
          ownerId: req.input.toUserId,
        },
      });

      return await req.ctx.prisma.itemTransfer.create({
        data: {
          fromUserId: req.ctx.user.id,
          ...req.input,
        },
      });
    },
  });
