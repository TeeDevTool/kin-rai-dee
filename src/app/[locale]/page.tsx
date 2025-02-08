import { HydrateClient } from "@/trpc/server";
import Header from "@/app/[locale]/components/Header";

export default async function Main() {
  return (
    <HydrateClient>
      <main className="font-anuphan bg-background flex min-h-screen px-4 pt-[82px] md:px-8 md:pt-[139px] lg:px-48 lg:pt-[106px]">
        {/* Content */}
        <Header />
      </main>
    </HydrateClient>
  );
}
