import { HydrateClient } from "@/trpc/server";
import { getLocale, getTranslations } from "next-intl/server";
import HomeButton from "../components/HomeButton";

export default async function ContactUs() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "contact_us" });

  return (
    <HydrateClient>
      <main className="flex flex-col gap-[55px] pb-16 md:gap-16 xl:gap-7">
        <section className="grid h-fit w-full gap-10 md:gap-16">
          <h1 className="text-h1 text-primary">{t("title")}</h1>
          <div className="flex flex-col gap-4 md:gap-6">
            <p className="text-body2">
              {t("paragraph_1")}
            </p>
            <p className="text-body2">
              {t("paragraph_2")}
            </p>
            <p className="text-body2 md:flex gap-2">
              {t("paragraph_3")}
              <a className="text-primary ml-2 md:ml-0" href="mailto:kinraidee@gmail.com">
                kinraidee@gmail.com
              </a>
            </p>
          </div>
          <p className="text-body2 text-center">
            {t("paragraph_4")}
            <br />
            {t("paragraph_5")}
          </p>
          <div className="flex justify-center">
            <HomeButton />
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
