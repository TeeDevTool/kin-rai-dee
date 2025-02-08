import { HydrateClient } from "@/trpc/server";
import Header from "@/app/[locale]/components/Header";
import { Randomizer } from "@/app/[locale]/components/Randomizer";

export default async function Main() {
  return (
    <HydrateClient>
      <main className="font-anuphan bg-background flex min-h-screen flex-col gap-[55px] px-4 pt-[82px] md:gap-16 md:px-8 md:pt-[139px] lg:gap-7 lg:px-48 lg:pt-[106px]">
        <section className="grid h-fit w-full gap-10 md:gap-16 lg:grid-cols-2">
          <Header />
        </section>
        <section className="flex justify-center">
          <Randomizer />
        </section>
      </main>
    </HydrateClient>
  );
}
