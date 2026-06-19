import { A_MINUTE } from "@/shared/lib";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Coordinates } from "../model/weather";
import { fetchWeather } from "./fetch-weather";

export function useWeather(coordinates: Coordinates) {
  return useSuspenseQuery({
    queryFn: () => fetchWeather(coordinates),
    queryKey: ["weather", coordinates],
    staleTime: 15 * A_MINUTE,
  });
}
