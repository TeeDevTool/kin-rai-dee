import { type Metadata } from "next";
import { HydrateClient } from "@/trpc/server";
import { getLocale, getTranslations } from "next-intl/server";
import { type ServerLocaleParams } from "@/app/types/params";
import HomeButton from "../components/HomeButton";

const BASE_URL = "https://www.kinraidee.info";

export async function generateMetadata({
  params,
}: {
  params: ServerLocaleParams;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  const canonicalUrl = `${BASE_URL}/${locale}/privacy-policies`;

  return {
    title: t("title"),
    description: t("intro"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        th: `${BASE_URL}/th/privacy-policies`,
        en: `${BASE_URL}/en/privacy-policies`,
      },
    },
  };
}

export default async function PrivacyPolicies() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "privacy" });

  const sections = [
    { heading: "section_data_heading", body: "section_data_paragraph" },
    { heading: "section_cookies_heading", body: "section_cookies_paragraph" },
    { heading: "section_analytics_heading", body: "section_analytics_paragraph" },
    { heading: "section_thirdparty_heading", body: "section_thirdparty_paragraph" },
    { heading: "section_children_heading", body: "section_children_paragraph" },
    { heading: "section_changes_heading", body: "section_changes_paragraph" },
  ] as const;

  return (
    <HydrateClient>
      <main className="flex flex-col gap-[55px] pb-16 md:gap-16 xl:gap-7">
        <section className="grid h-fit w-full gap-8 md:gap-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-h1 text-primary">{t("title")}</h1>
            <p className="text-label2 text-gray-500">{t("last_updated")}</p>
          </div>
          <p className="text-body2">{t("intro")}</p>

          {sections.map((section) => (
            <div key={section.heading} className="flex flex-col gap-4 md:gap-6">
              <h2 className="text-h4 text-primary">{t(section.heading)}</h2>
              <p className="text-body2">{t(section.body)}</p>
            </div>
          ))}

          {/* Advertising — kept as its own block since AdSense disclosure needs two paragraphs */}
          <div className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-h4 text-primary">{t("section_ads_heading")}</h2>
            <p className="text-body2">{t("section_ads_paragraph_1")}</p>
            <p className="text-body2">{t("section_ads_paragraph_2")}</p>
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-h4 text-primary">{t("section_contact_heading")}</h2>
            <p className="text-body2 flex flex-wrap gap-2">
              {t("section_contact_paragraph")}
              <a className="text-primary" href="mailto:kinraidee.info@gmail.com">
                kinraidee.info@gmail.com
              </a>
            </p>
          </div>

          <div className="flex justify-center">
            <HomeButton />
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
