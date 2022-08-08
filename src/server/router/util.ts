import * as trpc from "@trpc/server";
import { Context } from "./context";

export function createProtectedRouter() {
  return trpc.router<Context>().middleware(({ ctx, next }) => {
    if (!ctx.user) {
      throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    });
  });
}
