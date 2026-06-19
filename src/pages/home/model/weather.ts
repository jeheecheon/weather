export type CurrentWeather = {
  apparentTemperature: number;
  humidity: number;
  isDay: boolean;
  temperature: number;
  visibility: number;
  weatherCode: number;
  windDirection: number;
  windGusts: number;
  windSpeed: number;
};

export type TodayWeather = {
  max: number;
  min: number;
  precipitationProbabilityMax: number;
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
};

export type HourlyWeather = {
  precipitationProbability: number;
  temperature: number;
  time: string;
  weatherCode: number;
};

export type DailyWeather = {
  date: string;
  max: number;
  min: number;
  weatherCode: number;
};

export type Weather = {
  current: CurrentWeather;
  daily: DailyWeather[];
  hourly: HourlyWeather[];
  today: TodayWeather;
};

export type Coordinates = {
  lat: number;
  lon: number;
};
