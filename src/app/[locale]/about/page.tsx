import { type Metadata } from "next";
import { HydrateClient } from "@/trpc/server";
import { getLocale, getTranslations } from "next-intl/server";
import { type ServerLocaleParams } from "@/app/types/params";
import { Button } from "@/components/ui/button";
import HomeButton from "../components/HomeButton";
import Link from "next/link";

const BASE_URL = "https://www.kinraidee.info";

export async function generateMetadata({
  params,
}: {
  params: ServerLocaleParams;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const canonicalUrl = `${BASE_URL}/${locale}/about`;

  return {
    title: t("title"),
    description: t("intro_paragraph_1"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        th: `${BASE_URL}/th/about`,
        en: `${BASE_URL}/en/about`,
      },
    },
  };
}

export default async function About() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "about" });

  const sections = [
    {
      heading: "intro_heading",
      paragraphs: ["intro_paragraph_1", "intro_paragraph_2"],
    },
    {
      heading: "how_heading",
      paragraphs: ["how_paragraph_1", "how_paragraph_2"],
    },
    {
      heading: "who_heading",
      paragraphs: ["who_paragraph_1", "who_paragraph_2"],
    },
  ] as const;

  return (
    <HydrateClient>
      <main className="flex flex-col gap-[55px] pb-16 md:gap-16 xl:gap-7">
        <section className="grid h-fit w-full gap-8 md:gap-10">
          <h1 className="text-h1 text-primary">{t("title")}</h1>

          {sections.map((section) => (
            <div key={section.heading} className="flex flex-col gap-4 md:gap-6">
              <h2 className="text-h4 text-primary">{t(section.heading)}</h2>
              {section.paragraphs.map((p) => (
                <p key={p} className="text-body2">
                  {t(p)}
                </p>
              ))}
            </div>
          ))}

          <div className="flex justify-center gap-4">
            <Button asChild variant="link">
              <Link href={`/${locale}/contact-us`}>{t("contact_cta")}</Link>
            </Button>
            <HomeButton />
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
