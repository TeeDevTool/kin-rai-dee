import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type Dish } from "@/server/data/dishes";
import { Cuisine, Region } from "@/app/[locale]/stores/filterStore";

// Cuisine / region enums map onto the existing `filters` translation namespace.
const CUISINE_KEY: Record<Cuisine, string> = {
  [Cuisine.Thai]: "thai",
  [Cuisine.Chinese]: "chinese",
  [Cuisine.Korean]: "korean",
  [Cuisine.Japanese]: "japanese",
  [Cuisine.Vietnamese]: "vietnamese",
  [Cuisine.Western]: "western",
  [Cuisine.Asian]: "asian",
};

const REGION_KEY: Record<Region, string> = {
  [Region.Northern]: "northern",
  [Region.Esan]: "esan",
  [Region.Southern]: "southern",
  [Region.Central]: "central",
};

type DishDetailProps = {
  dish: Dish;
  locale: string;
  related: Dish[];
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-primary/10 text-primary text-label2 rounded-full px-3 py-1">
      {children}
    </span>
  );
}

export async function DishDetail({ dish, locale, related }: DishDetailProps) {
  const t = await getTranslations({ locale, namespace: "dish" });
  const tFilters = await getTranslations({ locale, namespace: "filters" });

  const isThai = locale === "th";
  const localName = isThai ? dish.name_th : dish.name_en;
  const altName = isThai ? dish.name_en : dish.name_th;
  const description = isThai ? dish.description_th : dish.description_en;

  const hubPath = dish.kind === "food" ? "food" : "dessert";
  const backLabel =
    dish.kind === "food" ? t("back_to_food_hub") : t("back_to_dessert_hub");

  const spiceLabel =
    dish.spicy === "TRUE"
      ? t("spice_hot")
      : dish.spicy === "BOTH"
        ? t("spice_both")
        : dish.spicy === "FALSE"
          ? t("spice_mild")
          : null;

  const dietaryTags: string[] = [];
  if (dish.isHealthy) dietaryTags.push(t("tag_healthy"));
  if (dish.isSoftDiet) dietaryTags.push(t("tag_soft_diet"));
  if (dish.isNoodle) dietaryTags.push(t("tag_noodle"));

  return (
    <article className="flex flex-col gap-8 md:gap-10">
      {/* Breadcrumb */}
      <nav className="text-label2 text-gray-500">
        <Link href={`/${locale}`} className="hover:text-primary">
          {t("randomize_cta")}
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/${locale}/${hubPath}`} className="hover:text-primary">
          {backLabel}
        </Link>
      </nav>

      {/* Title */}
      <header className="flex flex-col gap-1">
        <h1 className="text-h1 text-primary">{localName}</h1>
        <p className="text-subtitle2 text-gray-500">{altName}</p>
      </header>

      {/* Description */}
      <section className="flex flex-col gap-4">
        <h2 className="text-h4 text-primary">{t("about_heading")}</h2>
        <p className="text-body2 leading-relaxed">{description}</p>
      </section>

      {/* At a glance */}
      <section className="flex flex-col gap-4">
        <h2 className="text-h4 text-primary">{t("details_heading")}</h2>
        <dl className="flex flex-col gap-4">
          {dish.cuisine.length > 0 && (
            <div className="flex flex-col gap-2">
              <dt className="text-label1 text-gray-700">{t("cuisine_label")}</dt>
              <dd className="flex flex-wrap gap-2">
                {dish.cuisine.map((c) => (
                  <Chip key={c}>{tFilters(CUISINE_KEY[c])}</Chip>
                ))}
              </dd>
            </div>
          )}
          {dish.region && dish.region.length > 0 && (
            <div className="flex flex-col gap-2">
              <dt className="text-label1 text-gray-700">{t("region_label")}</dt>
              <dd className="flex flex-wrap gap-2">
                {dish.region.map((r) => (
                  <Chip key={r}>{tFilters(REGION_KEY[r])}</Chip>
                ))}
              </dd>
            </div>
          )}
          {spiceLabel && (
            <div className="flex flex-col gap-2">
              <dt className="text-label1 text-gray-700">{t("spice_label")}</dt>
              <dd className="flex flex-wrap gap-2">
                <Chip>{spiceLabel}</Chip>
              </dd>
            </div>
          )}
          {dietaryTags.length > 0 && (
            <div className="flex flex-col gap-2">
              <dt className="text-label1 text-gray-700">{t("dietary_label")}</dt>
              <dd className="flex flex-wrap gap-2">
                {dietaryTags.map((tag) => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-h4 text-primary">{t("related_heading")}</h2>
          <ul className="flex flex-col gap-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/${locale}/${r.kind === "food" ? "food" : "dessert"}/${r.slug}`}
                  className="text-body2 text-primary hover:text-secondary transition-all hover:font-medium"
                >
                  {isThai ? r.name_th : r.name_en}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* CTAs */}
      <div className="flex flex-wrap items-center gap-4">
        <Button asChild>
          <Link href={`/${locale}`}>{t("randomize_cta")}</Link>
        </Button>
        <Button asChild variant="link">
          <Link href={`/${locale}/${hubPath}`}>{backLabel}</Link>
        </Button>
      </div>
    </article>
  );
}
