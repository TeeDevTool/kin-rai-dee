import { CategoryButtons } from "@/app/[locale]/components/CategoryButtons";
import { getTranslations, getLocale } from "next-intl/server";
import { api } from "@/trpc/server";

export default async function Header() {
  const locale = (await getLocale()) as "th" | "en";
  const t = await getTranslations({ locale, namespace: "header" });

  const daily = await api.random.daily();

  return (
    <>
      {/* Introduction */}
      <div>
        <h1 className="text-primary md:text-h1 text-h2">{t("title")}</h1>
        <p className="text-subtitle2 mt-1 text-gray-500">{t("description")}</p>
        {/* Categories */}
        <div className="text-h mt-3 flex gap-2">
          <CategoryButtons />
        </div>
      </div>
      {/* Daily menu */}
      <div className="flex flex-col items-center">
        <h2 className="text-h4 text-gray-700">{t("daily")}</h2>
        <p className="text-label2 mt-1 text-gray-500">{t("daily_hint")}</p>
        <p className="md:text-h2 text-h3 text-secondary z-[1] line-clamp-1 text-center">
          {daily}
        </p>
        <svg
          className="z-0 -mt-3"
          width="116"
          height="20"
          viewBox="0 0 116 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M112.884 3.91876C112.884 3.91876 49.4296 3.66544 3.34059 16.7087"
            stroke="#E86A33"
            strokeWidth="6"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
}
