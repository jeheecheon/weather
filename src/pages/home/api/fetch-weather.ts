import { ensure } from "@/shared/lib";
import { z } from "zod";
import type { Coordinates, Weather } from "../model/weather";

const OPEN_METEO_FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const FORECAST_DAYS = 7;

const openMeteoWeatherSchema = z
  .object({
    current: z.object({
      apparent_temperature: z.number(),
      is_day: z.union([z.literal(0), z.literal(1)]),
      relative_humidity_2m: z.number(),
      temperature_2m: z.number(),
      time: z.string(),
      weather_code: z.number().int(),
      wind_direction_10m: z.number(),
      wind_gusts_10m: z.number(),
      wind_speed_10m: z.number(),
    }),
    daily: z.object({
      precipitation_probability_max: z.array(z.number()),
      sunrise: z.array(z.string()),
      sunset: z.array(z.string()),
      temperature_2m_max: z.array(z.number()),
      temperature_2m_min: z.array(z.number()),
      time: z.array(z.string()),
      uv_index_max: z.array(z.number()),
      weather_code: z.array(z.number().int()),
    }),
    hourly: z.object({
      precipitation_probability: z.array(z.number()),
      temperature_2m: z.array(z.number()),
      time: z.array(z.string()),
      visibility: z.array(z.number()),
      weather_code: z.array(z.number().int()),
    }),
  })
  .transform((response): Weather => {
    const daily = response.daily;
    const currentHour = response.current.time.slice(0, 13);
    const currentHourIndex = response.hourly.time.findIndex((time) => time.startsWith(currentHour));

    return {
      current: {
        apparentTemperature: response.current.apparent_temperature,
        humidity: response.current.relative_humidity_2m,
        isDay: response.current.is_day === 1,
        temperature: response.current.temperature_2m,
        visibility: ensure(response.hourly.visibility[Math.max(currentHourIndex, 0)]),
        weatherCode: response.current.weather_code,
        windDirection: response.current.wind_direction_10m,
        windGusts: response.current.wind_gusts_10m,
        windSpeed: response.current.wind_speed_10m,
      },
      daily: daily.time.map((date, index) => ({
        date,
        max: ensure(daily.temperature_2m_max[index]),
        min: ensure(daily.temperature_2m_min[index]),
        weatherCode: ensure(daily.weather_code[index]),
      })),
      hourly: response.hourly.time.map((time, index) => ({
        precipitationProbability: ensure(response.hourly.precipitation_probability[index]),
        temperature: ensure(response.hourly.temperature_2m[index]),
        time,
        weatherCode: ensure(response.hourly.weather_code[index]),
      })),
      today: {
        max: ensure(daily.temperature_2m_max[0]),
        min: ensure(daily.temperature_2m_min[0]),
        precipitationProbabilityMax: ensure(daily.precipitation_probability_max[0]),
        sunrise: ensure(daily.sunrise[0]),
        sunset: ensure(daily.sunset[0]),
        uvIndexMax: ensure(daily.uv_index_max[0]),
      },
    };
  });

export async function fetchWeather({ lat, lon }: Coordinates): Promise<Weather> {
  const searchParams = new URLSearchParams({
    current:
      "temperature_2m,weather_code,is_day,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m",
    daily:
      "temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset,uv_index_max,precipitation_probability_max",
    forecast_days: String(FORECAST_DAYS),
    hourly: "temperature_2m,weather_code,precipitation_probability,visibility",
    latitude: String(lat),
    longitude: String(lon),
    timezone: "Asia/Seoul",
    wind_speed_unit: "ms",
  });

  const response = await fetch(`${OPEN_METEO_FORECAST_URL}?${searchParams}`);

  if (!response.ok) {
    throw response;
  }

  const data = await response.json();
  const parsed = openMeteoWeatherSchema.parse(data);
  return parsed;
}
