import { ThemeProvider } from "@/shared/theme";
import { NextIntlClientProvider } from "next-intl";
import { type PropsWithChildren } from "react";
import { QueryClientProvider } from "./query-client-provider";

type GlobalProviderProps = PropsWithChildren;

export function GlobalProvider({ children }: GlobalProviderProps) {
  return (
    <ThemeProvider>
      <NextIntlClientProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
