import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { serverTranslate } from "@/server/utils/translate.util";
import { Redis } from "@upstash/redis";
import { randomNumber } from "@/server/utils/random";
import {
  Category,
  type Cuisine,
  type Region,
  filterSchema,
} from "@/app/[locale]/stores/filterStore";

// Database
import foods from "@/server/data/foods.json";

const redis = Redis.fromEnv();

type Food = {
  name_th: string;
  name_en: string;
  spicy: "TRUE" | "FALSE" | "BOTH";
  cuisine: Cuisine[];
  region: Region[];
  isHealthy: boolean;
  isSoftDiet: boolean;
  isNoodle: boolean;
};

function getFoodFilterPredicate(filter: Category) {
  switch (filter) {
    case Category.Spicy:
      return (food: Food) => food.spicy === "TRUE" || food.spicy === "BOTH";
    case Category.NonSpicy:
      return (food: Food) => food.spicy === "FALSE" || food.spicy === "BOTH";
    case Category.Healthy:
      return (food: Food) => food.isHealthy;
    case Category.SoftDiet:
      return (food: Food) => food.isSoftDiet;
    case Category.Noodle:
      return (food: Food) => food.isNoodle;
    default:
      return () => false;
  }
}

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
    const food = foods[randomNumber(foods.length)];

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

  get: publicProcedure.input(filterSchema).mutation(({ input }) => {
    const hasCuisines = input.cuisines.length > 0;
    const hasRegions = input.regions.length > 0;
    const hasCategories = input.categories.length > 0;

    const filteredFoods = (foods as Food[]).filter((food) => {
      if (!hasCuisines && !hasRegions) {
        return input.categories.some((category) =>
          getFoodFilterPredicate(category)(food),
        );
      }

      const matchesCuisine =
        hasCuisines &&
        input.cuisines.some((cuisine) => food.cuisine.includes(cuisine));
      const matchesRegion =
        hasRegions &&
        input.regions.some((region) => food.region.includes(region));
      const matchesCategory = hasCategories
        ? input.categories.some((category) =>
            getFoodFilterPredicate(category)(food),
          )
        : true;

      return (matchesCuisine || matchesRegion) && matchesCategory;
    });

    if (filteredFoods.length === 0) {
      throw new Error("No matching food found.");
    }
    const food = filteredFoods[randomNumber(filteredFoods.length)];

    return {
      th: food!.name_th,
      en: food!.name_en,
    };
  }),
});
