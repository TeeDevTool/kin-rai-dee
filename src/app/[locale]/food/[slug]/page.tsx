import { type Metadata } from "next";
import {
  DishPage,
  generateDishMetadata,
  generateDishStaticParams,
} from "@/app/[locale]/components/dishPage";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return generateDishStaticParams("food");
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  return generateDishMetadata("food", locale, slug);
}

export default async function FoodDishPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  return <DishPage kind="food" locale={locale} slug={slug} />;
}
