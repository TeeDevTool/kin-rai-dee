import { HydrateClient } from "@/trpc/server";
import Header from "@/app/[locale]/components/Header";
import { RandomizerContainer } from "@/app/[locale]/components/RandomizerContainer";
import { AdUnit } from "@/components/AdUnit";

export default async function Main() {
  return (
    <HydrateClient>
      <main className="flex flex-col gap-[55px] pb-16 md:gap-16 xl:gap-7">
        <section className="grid h-fit w-full gap-10 md:gap-16 xl:grid-cols-2">
          <Header />
        </section>
        <AdUnit adSlot="9925164506" adFormat="horizontal" className="w-full" />
        <section className="flex justify-center">
          <RandomizerContainer />
        </section>
      </main>
    </HydrateClient>
  );
}
