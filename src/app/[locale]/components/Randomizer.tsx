"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function Randomizer() {
  const t = useTranslations();

  return <Button>{t("randomizer.random")}</Button>;
}
