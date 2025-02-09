import { Filters } from "@/app/[locale]/components/Filters";
import { Quote } from "@/app/[locale]/components/Quote";
import { Randomizer } from "@/app/[locale]/components/Randomizer";
import { FilterStoreProvider } from "@/app/[locale]/providers/filterStoreProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLocale, getTranslations } from "next-intl/server";

function TabsContentWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col items-center">{children}</div>;
}

export async function RandomizerContainer() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "randomizer" });

  return (
    <FilterStoreProvider>
      <Tabs defaultValue="random" className="w-full text-center">
        <TabsList>
          <TabsTrigger value="random">{t("ready")}</TabsTrigger>
          <TabsTrigger value="categories">{t("categories")}</TabsTrigger>
        </TabsList>
        <TabsContent value="random">
          <TabsContentWrapper>
            <Randomizer />
            <Quote />
          </TabsContentWrapper>
        </TabsContent>
        <TabsContent value="categories">
          <TabsContentWrapper>
            <Filters />
            <Randomizer />
          </TabsContentWrapper>
        </TabsContent>
      </Tabs>
    </FilterStoreProvider>
  );
}
