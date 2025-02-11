import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { serverTranslate } from "@/server/utils/translate.util";
import { Redis } from "@upstash/redis";

// Database
import foods from "@/server/data/foods.json";

const redis = Redis.fromEnv();

type Food = {
  name_th: string;
  name_en: string;
};

export const randomRouter = createTRPCRouter({
  daily: publicProcedure.query(async () => {
    const today = new Date().toISOString().split("T")[0];
    const cacheKey = `daily_food:${today}`;

    // Check if daily food is cached
    const cachedFood = await redis.get<Food>(cacheKey);

    if (cachedFood) {
      return await serverTranslate({
        th: cachedFood.name_th,
        en: cachedFood.name_en,
      });
    }

    // Get random food
    const food = foods[Math.floor(Math.random() * foods.length)];

    // Store in Redis with expiration at midnight
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);

    const secondsUntilMidnight = Math.floor(
      (midnight.getTime() - now.getTime()) / 1000,
    );

    // Store in Redis with expiration at midnight
    await redis.set(cacheKey, JSON.stringify(food), {
      ex: secondsUntilMidnight,
    });

    return await serverTranslate({
      th: food!.name_th,
      en: food!.name_en,
    });
  }),
});
