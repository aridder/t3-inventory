import { dashboard } from "./dashboard";
// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { itemRouter } from "./item";
import { userRouter } from "./user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("user.", userRouter)
  .merge("item.", itemRouter)
  .merge("dashboard.", dashboard);

// export type definition of API
export type AppRouter = typeof appRouter;
