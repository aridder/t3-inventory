import { string, z } from "zod";
import { createRouter } from "./context";

export const userRouter = createRouter()
  .mutation("signup", {
    input: z.object({ username: z.string().min(2).max(255) }),
    output: z.object({ username: string(), id: string() }),
    async resolve(req) {
      const res = req.ctx.prisma.user.create({
        data: {
          username: req.input.username,
        },
      });
      return res;
    },
  })
  .mutation("login", {
    input: z.object({
      username: z.string(),
    }),
    async resolve({ input, ctx }) {
      const user = await ctx.prisma.user.findUnique({
        where: {
          username: input.username,
        },
        select: {
          username: true,
          id: true,
        },
      });
      return user;
    },
  });
