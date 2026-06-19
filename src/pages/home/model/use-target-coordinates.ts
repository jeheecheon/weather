import { A_SECOND, type Nullable } from "@/shared/lib";
import { useMemo } from "react";
import { useGeolocation } from "react-use";
import type { District } from "./district";
import type { Coordinates } from "./weather";

const GEOLOCATION_TIMEOUT = 3 * A_SECOND;
const SEOUL_COORDINATES: Coordinates = { lat: 37.5665, lon: 126.978 };

export function useTargetCoordinates(district: Nullable<District>): Nullable<Coordinates> {
  const geolocation = useGeolocation({ timeout: GEOLOCATION_TIMEOUT });

  return useMemo<Nullable<Coordinates>>(() => {
    if (district) {
      return { lat: district.lat, lon: district.lon };
    }
    if (geolocation.latitude != null && geolocation.longitude != null) {
      return { lat: geolocation.latitude, lon: geolocation.longitude };
    }
    if (geolocation.error) {
      return SEOUL_COORDINATES;
    }
    return null;
  }, [district, geolocation.latitude, geolocation.longitude, geolocation.error]);
}
