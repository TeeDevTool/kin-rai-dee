import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["th", "en"],
  defaultLocale: "th",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
