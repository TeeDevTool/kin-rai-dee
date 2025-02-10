import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import foods from "@/server/data/foods.json";

export const randomRouter = createTRPCRouter({
  daily: publicProcedure.query(async () => {
    return foods[Math.floor(Math.random() * foods.length)];
  }),
});
