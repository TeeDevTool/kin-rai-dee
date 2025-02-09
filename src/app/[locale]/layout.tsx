import "@/styles/globals.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { type ServerLocaleParams } from "@/app/types/params";
import { ModeStoreProvider } from "@/providers/modeStoreProvider";
import { Copyright } from "@/components/Copyright";
import { Navigator } from "@/components/Navigator";

export const metadata: Metadata = {
  title: "กินไรดี - แนะนำเมนูอาหารสำหรับคนไม่รู้จะกินอะไร",
  description:
    "กินไรดี เว็บไซต์สุ่มเมนูอาหารสำหรับคนที่ไม่รู้จะกินอะไร ค้นพบเมนูใหม่ๆ ที่คุณไม่เคยลอง แก้ปัญหาคิดไม่ออกว่าจะกินอะไรดี มีทั้งอาหารไทย จีน และนานาชาติให้เลือกหลากหลาย",
  keywords: [
    "กินไรดี",
    "สุ่มเมนูอาหาร",
    "แนะนำอาหาร",
    "เมนูอาหาร",
    "อาหารไทย",
    "ร้านอาหาร",
    "คิดไม่ออกจะกินอะไร",
    "เมนูแนะนำ",
    "สุ่มอาหาร",
  ],
  icons: [{ rel: "icon", url: "/logo.png" }],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: ServerLocaleParams;
}) {
  const { locale } = await params;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang="th">
      <body className="bg-background font-anuphan relative flex min-h-screen flex-col justify-between px-4 pt-[82px] md:px-8 md:pt-[139px] xl:px-48 xl:pt-[84px]">
        <svg
          className="absolute top-16 right-11 z-[-1] md:left-0"
          width="664"
          height="571"
          viewBox="0 0 664 571"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M587.569 459.418L20.3143 570L-35 1L663 88.4606L587.569 459.418Z"
            stroke="white"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          className="absolute top-0 right-22 z-[-1] hidden xl:block"
          width="372"
          height="306"
          viewBox="0 0 372 306"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M365.624 -12.7384L1 -28L33.251 261.018L371 305L365.624 -12.7384Z"
            stroke="white"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <NextIntlClientProvider messages={messages}>
          <TRPCReactProvider>
            <ModeStoreProvider>{children}</ModeStoreProvider>
          </TRPCReactProvider>
        </NextIntlClientProvider>
        <footer className="grid items-end py-6 md:grid-cols-2 xl:grid-cols-3">
          <Navigator />
          <Copyright />
        </footer>
      </body>
    </html>
  );
}
