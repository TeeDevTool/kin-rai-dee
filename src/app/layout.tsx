import "@/styles/globals.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";

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
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
