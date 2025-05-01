import { HydrateClient } from "@/trpc/server";
import { getLocale, getTranslations } from "next-intl/server";
import HomeButton from "../components/HomeButton";

export default async function ContactUs() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "contact_us" });

  return (
    <HydrateClient>
      <main className="flex flex-col gap-[55px] pb-16 md:gap-16 xl:gap-7">
        <section className="grid h-fit w-full gap-10 md:gap-16">
          <h1 className="text-h1 text-primary">{t("title")}</h1>
          <div className="flex flex-col gap-4 md:gap-6">
            <p className="text-body2">
              เว็บไซต์นี้เป็นโปรเจ็กต์ส่วนตัวที่ออกแบบ พัฒนา และดูแลเองทั้งหมด
              มีจุดประสงค์เพื่ออำนวยความสะดวกให้ทุกคนที่คิดไม่ออกว่ามื้อนี้จะกินอะไรดี
              ไม่ว่าจะเป็นคนไทย หรือชาวต่างชาติที่
              มาเที่ยวไทยแล้วเจออาหารหลากหลายละลานตาจนอาจจะสับสนว่าจะเลือกเมนูไหนดี
            </p>
            <p className="text-body2">
              ข้อมูลอาหารทั้งหมดบนเว็บนี้ แอดมินทำเอง
              อาจมีบางอันเข้าใจผิดก็อย่าเพิ่งโมโห เราพร้อมแก้ไขให้จ้า
            </p>
            <p className="text-body2 flex gap-2">
              หากมีข้อสงสัย ข้อเสนอแนะ หรือต้องการติดต่อเรา สามารถติดต่อมาได้ที่
              <a className="text-primary" href="mailto:kinraidee@gmail.com">
                kinraidee@gmail.com
              </a>
            </p>
          </div>
          <p className="text-body2 text-center">
            เราดีใจที่ได้เป็นส่วนหนึ่งในความเจริญอาหารของทุกคน
            <br />
            ขอให้กินดีอยู่ดี อย่าลืมรักษาสุขภาพนะ
          </p>
          <div className="flex justify-center">
            <HomeButton />
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
