import { type Metadata } from "next";
import {
  DishPage,
  generateDishMetadata,
  generateDishStaticParams,
} from "@/app/[locale]/components/dishPage";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return generateDishStaticParams("dessert");
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  return generateDishMetadata("dessert", locale, slug);
}

export default async function DessertDishPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  return <DishPage kind="dessert" locale={locale} slug={slug} />;
}
