"use client";

import { Filters } from "@/app/[locale]/components/Filters";
import { SweetFilters } from "@/app/[locale]/components/SweetFilters";
import { Quote } from "@/app/[locale]/components/Quote";
import { Randomizer } from "@/app/[locale]/components/Randomizer";
import {
  FilterStoreProvider,
} from "@/app/[locale]/providers/filterStoreProvider";
import { sweetDefaultInitState } from "@/app/[locale]/stores/filterStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useModeStore } from "@/providers/modeStoreProvider";
import { Mode } from "@/stores/modeStore";
import { useTranslations } from "next-intl";

function TabsContentWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col items-center">{children}</div>;
}

export function RandomizerContainer() {
  const t = useTranslations("randomizer");
  const mode = useModeStore((state) => state.mode);
  const isSweet = mode === Mode.Sweet;

  return (
    <FilterStoreProvider
      key={mode}
      initState={isSweet ? sweetDefaultInitState : undefined}
    >
      <Tabs defaultValue="random" className="w-full text-center">
        <TabsList>
          <TabsTrigger value="random">{t("ready")}</TabsTrigger>
          <TabsTrigger value="categories">{t("categories")}</TabsTrigger>
        </TabsList>
        <TabsContent value="random">
          <TabsContentWrapper>
            <Randomizer useDefaultFilter />
            <Quote />
          </TabsContentWrapper>
        </TabsContent>
        <TabsContent value="categories">
          <TabsContentWrapper>
            {isSweet ? <SweetFilters /> : <Filters />}
            <Randomizer />
          </TabsContentWrapper>
        </TabsContent>
      </Tabs>
    </FilterStoreProvider>
  );
}
