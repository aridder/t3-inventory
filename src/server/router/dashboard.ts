import { z } from "zod";
import { createRouter } from "./context";

export const dashboard = createRouter()
  .query("usercount", {
    async resolve(req) {
      return await req.ctx.prisma.user.count();
    },
  })
  .query("itemcount", {
    async resolve(req) {
      return await req.ctx.prisma.item.count();
    },
  })
  .query("transfercount", {
    async resolve(req) {
      return await req.ctx.prisma.itemTransfer.count();
    },
  })
  .query("items", {
    async resolve(req) {
      return await req.ctx.prisma.item.findMany();
    },
  })
  .query("itemtransfer", {
    async resolve(req) {
      return await req.ctx.prisma.itemTransfer.findMany();
    },
  });
