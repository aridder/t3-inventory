import { z } from "zod";
import { createRouter } from "./context";

export const itemRouter = createRouter()
  .mutation("create", {
    input: z.object({ title: z.string().min(1).max(255) }),
    async resolve(req) {
      console.log("headers", req.ctx.req?.headers);
      const ownerId = req.ctx.req?.headers["Authorization"] as string;
      const user = await req.ctx.prisma.user.findUnique({
        where: {
          id: ownerId,
        },
      });
      if (!user) {
        return {
          error: "Not Authorized or logged in",
        };
      }
      return req.ctx.prisma.item.create({
        data: {
          ownerId: user.id,
          ...req.input,
        },
      });
    },
  })
  .mutation("transfer", {
    input: z.object({
      fromUserId: z.string(),
      toUserId: z.string(),
      itemId: z.string(),
    }),
    async resolve(req) {
      return req.ctx.prisma.itemTransfer.create({
        data: {
          ...req.input,
        },
      });
    },
  });
