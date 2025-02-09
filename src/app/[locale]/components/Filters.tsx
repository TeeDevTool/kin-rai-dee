"use client";

import { Button } from "@/components/ui/button";
import { useFilterStore } from "@/app/[locale]/providers/filterStoreProvider";
import { useTranslations, useLocale } from "next-intl";
import { Category, Cuisine, Region } from "@/app/[locale]/stores/filterStore";
import { cn } from "@/lib/utils";
import { getActiveIconStyle } from "@/app/[locale]/utils/style.util";

type Filter<T> = {
  id: T;
  name: React.ReactNode;
};

export function Filters() {
  const locale = useLocale();
  const t = useTranslations("filters");
  const {
    categories,
    regions,
    cuisines,
    setCategories,
    setRegions,
    setCuisines,
    setFilterAll,
    getIsFilterAll,
  } = useFilterStore((state) => state);

  const isFilterAll = getIsFilterAll();

  const CATEGORIES: Filter<Category>[] = [
    {
      id: Category.Noodle,
      name: t("noodle"),
    },
    {
      id: Category.Spicy,
      name: t("spicy"),
    },
    {
      id: Category.NonSpicy,
      name: t("non_spicy"),
    },
    {
      id: Category.Healthy,
      name: t("healthy"),
    },
    {
      id: Category.SoftDiet,
      name: (
        <>
          {t("soft_diet")}
          {locale === "th" && (
            <>
              <br />
              &#40;{t("soft_diet_hint")}&#41;
            </>
          )}
        </>
      ),
    },
  ];

  const REGIONS: Filter<Region>[] = [
    {
      id: Region.Northern,
      name: t("northern"),
    },
    {
      id: Region.Esan,
      name: t("esan"),
    },
    {
      id: Region.Southern,
      name: t("southern"),
    },
    {
      id: Region.Central,
      name: t("central"),
    },
  ];

  const CUISINES: Filter<Cuisine>[] = [
    {
      id: Cuisine.Thai,
      name: t("thai"),
    },
    {
      id: Cuisine.Chinese,
      name: t("chinese"),
    },
    {
      id: Cuisine.Korean,
      name: t("korean"),
    },
    {
      id: Cuisine.Japanese,
      name: t("japanese"),
    },
    {
      id: Cuisine.Vietnamese,
      name: t("vietnamese"),
    },
    {
      id: Cuisine.Western,
      name: t("western"),
    },
  ];

  return (
    <div className="mb-8 grid w-full gap-6 xl:mb-12">
      <div className="grid gap-3">
        <h4 className="text-subtitle1 w-fit text-gray-700">หมวดยอดฮิต</h4>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          <Button
            className="w-full rounded-2xl"
            variant="outline"
            size="lg"
            active={isFilterAll}
            onClick={() => void setFilterAll()}
          >
            <svg
              className={cn(
                "transition-all duration-300 ease-in-out",
                getActiveIconStyle(isFilterAll),
              )}
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 2.25C10.5716 2.25 8.68657 2.82183 7.08319 3.89317C5.47982 4.96451 4.23013 6.48726 3.49218 8.26884C2.75422 10.0504 2.56114 12.0108 2.93735 13.9021C3.31355 15.7934 4.24215 17.5307 5.60571 18.8943C6.96928 20.2579 8.70656 21.1865 10.5979 21.5627C12.4892 21.9389 14.4496 21.7458 16.2312 21.0078C18.0127 20.2699 19.5355 19.0202 20.6068 17.4168C21.6782 15.8134 22.25 13.9284 22.25 12C22.2473 9.41498 21.2192 6.93661 19.3913 5.10872C17.5634 3.28084 15.085 2.25273 12.5 2.25ZM16.7806 10.2806L11.5306 15.5306C11.461 15.6004 11.3783 15.6557 11.2872 15.6934C11.1962 15.7312 11.0986 15.7506 11 15.7506C10.9014 15.7506 10.8038 15.7312 10.7128 15.6934C10.6218 15.6557 10.539 15.6004 10.4694 15.5306L8.21938 13.2806C8.07865 13.1399 7.99959 12.949 7.99959 12.75C7.99959 12.551 8.07865 12.3601 8.21938 12.2194C8.36011 12.0786 8.55098 11.9996 8.75 11.9996C8.94903 11.9996 9.1399 12.0786 9.28063 12.2194L11 13.9397L15.7194 9.21937C15.7891 9.14969 15.8718 9.09442 15.9628 9.0567C16.0539 9.01899 16.1515 8.99958 16.25 8.99958C16.3486 8.99958 16.4461 9.01899 16.5372 9.0567C16.6282 9.09442 16.7109 9.14969 16.7806 9.21937C16.8503 9.28906 16.9056 9.37178 16.9433 9.46283C16.981 9.55387 17.0004 9.65145 17.0004 9.75C17.0004 9.84855 16.981 9.94613 16.9433 10.0372C16.9056 10.1282 16.8503 10.2109 16.7806 10.2806Z"
                fill="currentColor"
              />
            </svg>
            {t("all")}
            <br />
            &#40;{t("all_hint")}&#41;
          </Button>
          {CATEGORIES.map((category) => {
            const isActive = categories.includes(category.id);

            return (
              <Button
                key={category.id}
                className="w-full rounded-2xl"
                variant="outline"
                size="lg"
                active={isActive}
                onClick={() => void setCategories(category.id)}
              >
                <svg
                  className={cn(
                    "transition-all duration-300 ease-in-out",
                    getActiveIconStyle(isActive),
                  )}
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 2.25C10.5716 2.25 8.68657 2.82183 7.08319 3.89317C5.47982 4.96451 4.23013 6.48726 3.49218 8.26884C2.75422 10.0504 2.56114 12.0108 2.93735 13.9021C3.31355 15.7934 4.24215 17.5307 5.60571 18.8943C6.96928 20.2579 8.70656 21.1865 10.5979 21.5627C12.4892 21.9389 14.4496 21.7458 16.2312 21.0078C18.0127 20.2699 19.5355 19.0202 20.6068 17.4168C21.6782 15.8134 22.25 13.9284 22.25 12C22.2473 9.41498 21.2192 6.93661 19.3913 5.10872C17.5634 3.28084 15.085 2.25273 12.5 2.25ZM16.7806 10.2806L11.5306 15.5306C11.461 15.6004 11.3783 15.6557 11.2872 15.6934C11.1962 15.7312 11.0986 15.7506 11 15.7506C10.9014 15.7506 10.8038 15.7312 10.7128 15.6934C10.6218 15.6557 10.539 15.6004 10.4694 15.5306L8.21938 13.2806C8.07865 13.1399 7.99959 12.949 7.99959 12.75C7.99959 12.551 8.07865 12.3601 8.21938 12.2194C8.36011 12.0786 8.55098 11.9996 8.75 11.9996C8.94903 11.9996 9.1399 12.0786 9.28063 12.2194L11 13.9397L15.7194 9.21937C15.7891 9.14969 15.8718 9.09442 15.9628 9.0567C16.0539 9.01899 16.1515 8.99958 16.25 8.99958C16.3486 8.99958 16.4461 9.01899 16.5372 9.0567C16.6282 9.09442 16.7109 9.14969 16.7806 9.21937C16.8503 9.28906 16.9056 9.37178 16.9433 9.46283C16.981 9.55387 17.0004 9.65145 17.0004 9.75C17.0004 9.84855 16.981 9.94613 16.9433 10.0372C16.9056 10.1282 16.8503 10.2109 16.7806 10.2806Z"
                    fill="currentColor"
                  />
                </svg>
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-3">
        <h4 className="text-subtitle1 w-fit text-gray-700">แยกตามภูมิภาค</h4>
        <div className="flex flex-wrap gap-3">
          {REGIONS.map((region) => {
            const isActive = regions.includes(region.id);

            return (
              <Button
                key={region.id}
                className="min-w-30"
                variant="outline"
                active={isActive}
                onClick={() => void setRegions(region.id)}
              >
                <svg
                  className={cn(
                    "transition-all duration-300 ease-in-out",
                    getActiveIconStyle(isActive),
                  )}
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 2.25C10.5716 2.25 8.68657 2.82183 7.08319 3.89317C5.47982 4.96451 4.23013 6.48726 3.49218 8.26884C2.75422 10.0504 2.56114 12.0108 2.93735 13.9021C3.31355 15.7934 4.24215 17.5307 5.60571 18.8943C6.96928 20.2579 8.70656 21.1865 10.5979 21.5627C12.4892 21.9389 14.4496 21.7458 16.2312 21.0078C18.0127 20.2699 19.5355 19.0202 20.6068 17.4168C21.6782 15.8134 22.25 13.9284 22.25 12C22.2473 9.41498 21.2192 6.93661 19.3913 5.10872C17.5634 3.28084 15.085 2.25273 12.5 2.25ZM16.7806 10.2806L11.5306 15.5306C11.461 15.6004 11.3783 15.6557 11.2872 15.6934C11.1962 15.7312 11.0986 15.7506 11 15.7506C10.9014 15.7506 10.8038 15.7312 10.7128 15.6934C10.6218 15.6557 10.539 15.6004 10.4694 15.5306L8.21938 13.2806C8.07865 13.1399 7.99959 12.949 7.99959 12.75C7.99959 12.551 8.07865 12.3601 8.21938 12.2194C8.36011 12.0786 8.55098 11.9996 8.75 11.9996C8.94903 11.9996 9.1399 12.0786 9.28063 12.2194L11 13.9397L15.7194 9.21937C15.7891 9.14969 15.8718 9.09442 15.9628 9.0567C16.0539 9.01899 16.1515 8.99958 16.25 8.99958C16.3486 8.99958 16.4461 9.01899 16.5372 9.0567C16.6282 9.09442 16.7109 9.14969 16.7806 9.21937C16.8503 9.28906 16.9056 9.37178 16.9433 9.46283C16.981 9.55387 17.0004 9.65145 17.0004 9.75C17.0004 9.84855 16.981 9.94613 16.9433 10.0372C16.9056 10.1282 16.8503 10.2109 16.7806 10.2806Z"
                    fill="currentColor"
                  />
                </svg>
                {region.name}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-3">
        <h4 className="text-subtitle1 w-fit text-gray-700">แยกตามสัญชาติ</h4>
        <div className="flex flex-wrap gap-3">
          {CUISINES.map((cuisine) => {
            const isActive = cuisines.includes(cuisine.id);

            return (
              <Button
                key={cuisine.id}
                className="min-w-30"
                variant="outline"
                active={isActive}
                onClick={() => void setCuisines(cuisine.id)}
              >
                <svg
                  className={cn(
                    "transition-all duration-300 ease-in-out",
                    getActiveIconStyle(isActive),
                  )}
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 2.25C10.5716 2.25 8.68657 2.82183 7.08319 3.89317C5.47982 4.96451 4.23013 6.48726 3.49218 8.26884C2.75422 10.0504 2.56114 12.0108 2.93735 13.9021C3.31355 15.7934 4.24215 17.5307 5.60571 18.8943C6.96928 20.2579 8.70656 21.1865 10.5979 21.5627C12.4892 21.9389 14.4496 21.7458 16.2312 21.0078C18.0127 20.2699 19.5355 19.0202 20.6068 17.4168C21.6782 15.8134 22.25 13.9284 22.25 12C22.2473 9.41498 21.2192 6.93661 19.3913 5.10872C17.5634 3.28084 15.085 2.25273 12.5 2.25ZM16.7806 10.2806L11.5306 15.5306C11.461 15.6004 11.3783 15.6557 11.2872 15.6934C11.1962 15.7312 11.0986 15.7506 11 15.7506C10.9014 15.7506 10.8038 15.7312 10.7128 15.6934C10.6218 15.6557 10.539 15.6004 10.4694 15.5306L8.21938 13.2806C8.07865 13.1399 7.99959 12.949 7.99959 12.75C7.99959 12.551 8.07865 12.3601 8.21938 12.2194C8.36011 12.0786 8.55098 11.9996 8.75 11.9996C8.94903 11.9996 9.1399 12.0786 9.28063 12.2194L11 13.9397L15.7194 9.21937C15.7891 9.14969 15.8718 9.09442 15.9628 9.0567C16.0539 9.01899 16.1515 8.99958 16.25 8.99958C16.3486 8.99958 16.4461 9.01899 16.5372 9.0567C16.6282 9.09442 16.7109 9.14969 16.7806 9.21937C16.8503 9.28906 16.9056 9.37178 16.9433 9.46283C16.981 9.55387 17.0004 9.65145 17.0004 9.75C17.0004 9.84855 16.981 9.94613 16.9433 10.0372C16.9056 10.1282 16.8503 10.2109 16.7806 10.2806Z"
                    fill="currentColor"
                  />
                </svg>
                {cuisine.name}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
