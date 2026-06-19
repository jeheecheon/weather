import { useMemo } from "react";
import { districts, type District } from "./district";
import type { Coordinates } from "./weather";

const MAX_MATCH_DISTANCE_KM = 50;
const EARTH_RADIUS_KM = 6371;

export function useCurrentDistrict(coordinates: Coordinates): District {
  return useMemo(() => findNearestDistrict(coordinates), [coordinates]);
}

function findNearestDistrict({ lat, lon }: Coordinates): District {
  let nearest = districts[0];
  let nearestDistance = Infinity;

  for (const district of districts) {
    const distance = measureDistance(lat, lon, district.lat, district.lon);
    if (distance < nearestDistance) {
      nearest = district;
      nearestDistance = distance;
    }
  }

  if (nearestDistance > MAX_MATCH_DISTANCE_KM) {
    return { lat, lon, name: "현재 위치" };
  }

  return nearest;
}

function measureDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}
