import { getLocale } from "next-intl/server";

export async function serverTranslate(translations: Record<string, string>) {
  const locale = await getLocale();

  return translations[locale];
}
