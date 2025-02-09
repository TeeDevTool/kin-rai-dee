import { HydrateClient } from "@/trpc/server";
import Header from "@/app/[locale]/components/Header";
import { RandomizerContainer } from "@/app/[locale]/components/RandomizerContainer";

export default async function Main() {
  return (
    <HydrateClient>
      <main className="flex flex-col gap-[55px] pb-16 md:gap-16 lg:gap-7">
        <section className="grid h-fit w-full gap-10 md:gap-16 lg:grid-cols-2">
          <Header />
        </section>
        <section className="flex justify-center">
          <RandomizerContainer />
        </section>
      </main>
    </HydrateClient>
  );
}
