import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { HydrateClient } from "@/trpc/server";
import {
  type DishKind,
  getDishBySlug,
  getDishesWithContent,
  getRelatedDishes,
} from "@/server/data/dishes";
import { DishDetail } from "@/app/[locale]/components/DishDetail";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://www.kinraidee.info";

/** Pre-render every (locale, slug) pair that has curated content. */
export function generateDishStaticParams(kind: DishKind) {
  return routing.locales.flatMap((locale) =>
    getDishesWithContent(kind).map((dish) => ({ locale, slug: dish.slug })),
  );
}

export async function generateDishMetadata(
  kind: DishKind,
  locale: string,
  slug: string,
): Promise<Metadata> {
  const dish = getDishBySlug(kind, slug);
  if (!dish) return {};

  const isThai = locale === "th";
  const name = isThai ? dish.name_th : dish.name_en;
  const altName = isThai ? dish.name_en : dish.name_th;
  const description = (isThai ? dish.description_th : dish.description_en) ?? "";
  const path = `${kind}/${slug}`;
  const canonicalUrl = `${BASE_URL}/${locale}/${path}`;

  return {
    title: `${name} (${altName})`,
    description: description.slice(0, 160),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        th: `${BASE_URL}/th/${path}`,
        en: `${BASE_URL}/en/${path}`,
      },
    },
    openGraph: {
      title: `${name} (${altName})`,
      description: description.slice(0, 200),
      url: canonicalUrl,
      type: "article",
    },
  };
}

export async function DishPage({
  kind,
  locale,
  slug,
}: {
  kind: DishKind;
  locale: string;
  slug: string;
}) {
  const dish = getDishBySlug(kind, slug);
  if (!dish) notFound();

  const related = getRelatedDishes(dish);
  const name = locale === "th" ? dish.name_th : dish.name_en;
  const description =
    (locale === "th" ? dish.description_th : dish.description_en) ?? "";

  // Recipe/Food schema improves search-result relevance for food intent.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name,
    description,
    recipeCuisine: dish.cuisine,
    inLanguage: locale,
    url: `${BASE_URL}/${locale}/${kind}/${slug}`,
    author: {
      "@type": "Organization",
      name: "กินไรดี",
      url: BASE_URL,
    },
  };

  return (
    <HydrateClient>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-col gap-[55px] pb-16 md:gap-16 xl:gap-7">
        <section className="grid h-fit w-full max-w-3xl gap-10 md:gap-16">
          <DishDetail dish={dish} locale={locale} related={related} />
        </section>
      </main>
    </HydrateClient>
  );
}
