"use client";

import { Button } from "@/components/ui/button";
import { useFilterStore } from "@/app/[locale]/providers/filterStoreProvider";
import { api } from "@/trpc/react";
import { useTranslations, useLocale } from "next-intl";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRef } from "react";

export function Randomizer() {
  const { toast } = useToast();
  const t = useTranslations();
  const locale = useLocale() as "th" | "en";
  const filterStore = useFilterStore((state) => state);
  const isFirstSuccess = useRef(false);

  const { data, isPending, isSuccess, mutate } = api.random.get.useMutation({
    onMutate: (filter) => {
      if (
        filter.categories.length === 0 &&
        filter.regions.length === 0 &&
        filter.cuisines.length === 0
      ) {
        throw new Error(t("error.empty_filter"));
      }
    },
    onSuccess: async () => {
      if (!isFirstSuccess.current) {
        isFirstSuccess.current = true;
      }
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error.message ?? t("error.general"),
      });
    },
  });

  return (
    <div className="flex flex-col items-center gap-6 *:w-fit">
      <p
        className={cn(
          "!text-h4 text-primary scale-100 transition-all duration-300",
          !data && "scale-0",
          data && "mt-2",
        )}
      >
        {data?.[locale] ?? null}
      </p>
      <Button
        className={cn(isPending && "pointer-events-none")}
        size={isFirstSuccess.current ? "default" : "xl"}
        variant={isFirstSuccess.current ? "outline" : "default"}
        onClick={() => mutate(filterStore)}
      >
        <svg
          className={cn(
            !isFirstSuccess.current &&
              "-ml-2 !size-0 scale-0 transition-all duration-300",
            isFirstSuccess.current &&
              "!size-6 scale-100 transition-all duration-300",
            isPending && "animate-spin-reverse",
          )}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 11.9987C21.0002 14.3648 20.0686 16.6359 18.4069 18.3202C16.7451 20.0046 14.4869 20.9669 12.1209 20.9987H12C9.70147 21.0044 7.48901 20.1248 5.82187 18.5424C5.75028 18.4747 5.69273 18.3936 5.6525 18.3036C5.61227 18.2136 5.59016 18.1166 5.58741 18.0181C5.58467 17.9196 5.60136 17.8216 5.63652 17.7295C5.67168 17.6375 5.72463 17.5532 5.79234 17.4816C5.86006 17.41 5.94121 17.3525 6.03116 17.3123C6.12112 17.272 6.21812 17.2499 6.31662 17.2472C6.41512 17.2444 6.5132 17.2611 6.60525 17.2963C6.69731 17.3314 6.78153 17.3844 6.85312 17.4521C7.92544 18.4634 9.27195 19.1363 10.7245 19.3867C12.177 19.6372 13.6711 19.4541 15.0202 18.8603C16.3692 18.2666 17.5134 17.2884 18.3098 16.0482C19.1062 14.8079 19.5195 13.3605 19.4981 11.8867C19.4766 10.4129 19.0214 8.97808 18.1892 7.76151C17.3571 6.54494 16.1849 5.60053 14.8192 5.04626C13.4534 4.492 11.9546 4.35245 10.51 4.64506C9.06537 4.93766 7.739 5.64944 6.69656 6.69148C6.6889 6.69976 6.68076 6.70759 6.67219 6.71492L4.18031 8.99867H6.75C6.94891 8.99867 7.13968 9.07769 7.28033 9.21834C7.42098 9.35899 7.5 9.54976 7.5 9.74867C7.5 9.94758 7.42098 10.1383 7.28033 10.279C7.13968 10.4197 6.94891 10.4987 6.75 10.4987H2.25C2.05109 10.4987 1.86032 10.4197 1.71967 10.279C1.57902 10.1383 1.5 9.94758 1.5 9.74867V5.24867C1.5 5.04976 1.57902 4.85899 1.71967 4.71834C1.86032 4.57769 2.05109 4.49867 2.25 4.49867C2.44891 4.49867 2.63968 4.57769 2.78033 4.71834C2.92098 4.85899 3 5.04976 3 5.24867V8.04242L5.64844 5.62367C6.90842 4.36858 8.512 3.51492 10.2567 3.17045C12.0015 2.82598 13.8092 3.00614 15.4516 3.68819C17.0941 4.37024 18.4976 5.5236 19.4851 7.00268C20.4726 8.48176 20.9997 10.2202 21 11.9987Z"
            fill="currentColor"
          />
        </svg>

        {isFirstSuccess.current
          ? t("randomizer.try_again")
          : t("randomizer.random")}
        <Loader2
          className={cn(
            "animate-spin duration-300",
            (!isPending || isFirstSuccess.current) &&
              "-mr-2 !size-0 scale-0 transition-all duration-300",
            isPending &&
              !isFirstSuccess.current &&
              "!size-12 scale-100 transition-all duration-300",
          )}
        />
        <svg
          className={cn(
            (isSuccess || isPending) &&
              "-mr-2 !size-0 scale-0 transition-all duration-300",
          )}
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M41.5612 25.0621L28.0613 38.5621C27.7798 38.8435 27.398 39.0017 27 39.0017C26.602 39.0017 26.2202 38.8435 25.9387 38.5621C25.6573 38.2806 25.4992 37.8989 25.4992 37.5008C25.4992 37.1028 25.6573 36.721 25.9387 36.4396L36.8794 25.5008H7.5C7.10218 25.5008 6.72064 25.3428 6.43934 25.0615C6.15804 24.7802 6 24.3987 6 24.0008C6 23.603 6.15804 23.2215 6.43934 22.9402C6.72064 22.6589 7.10218 22.5008 7.5 22.5008H36.8794L25.9387 11.5621C25.6573 11.2806 25.4992 10.8989 25.4992 10.5008C25.4992 10.1028 25.6573 9.72104 25.9387 9.43958C26.2202 9.15812 26.602 9 27 9C27.398 9 27.7798 9.15812 28.0613 9.43958L41.5612 22.9396C41.7007 23.0789 41.8114 23.2443 41.8868 23.4264C41.9623 23.6085 42.0012 23.8037 42.0012 24.0008C42.0012 24.198 41.9623 24.3931 41.8868 24.5752C41.8114 24.7573 41.7007 24.9228 41.5612 25.0621Z"
            fill="currentColor"
          />
        </svg>
      </Button>
    </div>
  );
}
