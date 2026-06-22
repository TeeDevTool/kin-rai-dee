import { type Cuisine, type Region } from "@/app/[locale]/stores/filterStore";

import foodsData from "@/server/data/foods.json";
import dessertsData from "@/server/data/desserts.json";

export type DishKind = "food" | "dessert";

export type Dish = {
  slug: string;
  name_th: string;
  name_en: string;
  cuisine: Cuisine[];
  // Savory-only attributes (absent on desserts).
  spicy?: "TRUE" | "FALSE" | "BOTH";
  region?: Region[];
  isHealthy?: boolean;
  isSoftDiet?: boolean;
  isNoodle?: boolean;
  // Curated, crawlable content. Present only once a dish has been written up.
  description_th?: string;
  description_en?: string;
  kind: DishKind;
};

const foods: Dish[] = (foodsData as Omit<Dish, "kind">[]).map((d) => ({
  ...d,
  kind: "food",
}));

const desserts: Dish[] = (dessertsData as Omit<Dish, "kind">[]).map((d) => ({
  ...d,
  kind: "dessert",
}));

function collectionFor(kind: DishKind): Dish[] {
  return kind === "food" ? foods : desserts;
}

/** A dish is publishable as a page only when it has curated content in both locales. */
export function hasContent(dish: Dish): boolean {
  return Boolean(dish.description_th && dish.description_en);
}

/** All dishes of a kind that are ready to be rendered as their own page. */
export function getDishesWithContent(kind: DishKind): Dish[] {
  return collectionFor(kind).filter(hasContent);
}

export function getDishBySlug(kind: DishKind, slug: string): Dish | undefined {
  const dish = collectionFor(kind).find((d) => d.slug === slug);
  return dish && hasContent(dish) ? dish : undefined;
}

/**
 * Related dishes for internal linking: same kind, sharing a cuisine or region,
 * limited to ones that also have their own page. Falls back to other published
 * dishes of the same kind if there are not enough overlaps.
 */
export function getRelatedDishes(dish: Dish, limit = 4): Dish[] {
  const pool = getDishesWithContent(dish.kind).filter(
    (d) => d.slug !== dish.slug,
  );

  const scored = pool
    .map((d) => {
      const sharesCuisine = d.cuisine.some((c) => dish.cuisine.includes(c));
      const sharesRegion = Boolean(
        d.region?.some((r) => dish.region?.includes(r)),
      );
      const score = (sharesCuisine ? 2 : 0) + (sharesRegion ? 1 : 0);
      return { dish: d, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.dish);
}
