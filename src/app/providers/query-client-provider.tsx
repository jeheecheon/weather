import { A_DAY, A_MINUTE } from "@/shared/lib";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { type PropsWithChildren } from "react";

const QUERY_CACHE_MAX_AGE = A_DAY;
const QUERY_CACHE_STORAGE_KEY = "weather-query-cache";
const QUERY_CACHE_BUSTER = "weather-v2";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: A_DAY,
      staleTime: 15 * A_MINUTE,
    },
  },
});

const queryPersister = createAsyncStoragePersister({
  key: QUERY_CACHE_STORAGE_KEY,
  storage: window.localStorage,
});

export function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        buster: QUERY_CACHE_BUSTER,
        maxAge: QUERY_CACHE_MAX_AGE,
        persister: queryPersister,
      }}
    >
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
