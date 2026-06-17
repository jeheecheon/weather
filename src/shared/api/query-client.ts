import { QueryClient } from "@tanstack/react-query";
import { A_MINUTE, isBrowser, type Optional } from "../lib";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: A_MINUTE,
      },
    },
  });
}

let browserQueryClient: Optional<QueryClient>;

export function getQueryClient() {
  if (!isBrowser()) {
    return makeQueryClient();
  }

  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}
