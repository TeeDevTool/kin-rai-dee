import { type Metadata } from "next";
import { DishHub, generateHubMetadata } from "@/app/[locale]/components/dishHub";
import { type ServerLocaleParams } from "@/app/types/params";

export async function generateMetadata({
  params,
}: {
  params: ServerLocaleParams;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateHubMetadata("dessert", locale);
}

export default async function DessertHub({
  params,
}: {
  params: ServerLocaleParams;
}) {
  const { locale } = await params;
  return <DishHub kind="dessert" locale={locale} />;
}
