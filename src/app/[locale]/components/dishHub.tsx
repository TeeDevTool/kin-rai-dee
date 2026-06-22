import { type Metadata } from "next";
import Link from "next/link";
import { HydrateClient } from "@/trpc/server";
import { getTranslations } from "next-intl/server";
import { type DishKind, getDishesWithContent } from "@/server/data/dishes";
import { Button } from "@/components/ui/button";
import HomeButton from "@/app/[locale]/components/HomeButton";

const BASE_URL = "https://www.kinraidee.info";

export async function generateHubMetadata(
  kind: DishKind,
  locale: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "dish" });
  const titleKey = kind === "food" ? "food_hub_title" : "dessert_hub_title";
  const descKey =
    kind === "food" ? "food_hub_description" : "dessert_hub_description";
  const canonicalUrl = `${BASE_URL}/${locale}/${kind}`;

  return {
    title: t(titleKey),
    description: t(descKey),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        th: `${BASE_URL}/th/${kind}`,
        en: `${BASE_URL}/en/${kind}`,
      },
    },
  };
}

export async function DishHub({
  kind,
  locale,
}: {
  kind: DishKind;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: "dish" });
  const isThai = locale === "th";
  const dishes = getDishesWithContent(kind);

  const heading =
    kind === "food" ? t("food_hub_heading") : t("dessert_hub_heading");
  const intro = kind === "food" ? t("hub_intro_food") : t("hub_intro_dessert");

  return (
    <HydrateClient>
      <main className="flex flex-col gap-[55px] pb-16 md:gap-16 xl:gap-7">
        <section className="grid h-fit w-full gap-8 md:gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-h1 text-primary">{heading}</h1>
            <p className="text-body2">{intro}</p>
          </div>

          <ul className="grid gap-4 md:grid-cols-2">
            {dishes.map((dish) => {
              const name = isThai ? dish.name_th : dish.name_en;
              const altName = isThai ? dish.name_en : dish.name_th;
              const description = isThai
                ? dish.description_th
                : dish.description_en;
              return (
                <li
                  key={dish.slug}
                  className="border-primary/15 flex flex-col gap-2 rounded-lg border p-4"
                >
                  <Link
                    href={`/${locale}/${kind}/${dish.slug}`}
                    className="flex flex-col gap-1"
                  >
                    <span className="text-h4 text-primary">{name}</span>
                    <span className="text-label2 text-gray-500">{altName}</span>
                  </Link>
                  <p className="text-body2 line-clamp-3 text-gray-700">
                    {description}
                  </p>
                  <Link
                    href={`/${locale}/${kind}/${dish.slug}`}
                    className="text-label1 text-primary hover:text-secondary transition-all hover:font-medium"
                  >
                    {t("read_more")} →
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="text-label2 text-center text-gray-500">
            {t("more_coming")}
          </p>

          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href={`/${locale}`}>{t("randomize_cta")}</Link>
            </Button>
            <HomeButton />
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
