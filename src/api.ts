import type { City } from './types';

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export type RawWeather = {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    rain?: {
      '3h': number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export type Weather = {
  city: {
    id: string;
    name: string;
  };
  forecast: Array<{
    day: string;
    temp: number;
    min: number;
    max: number;
    icon: string;
    humidity: number;
    visibility: number;
    pressure: number;
  }>;
};

export function kelvinToCelsius(temp: number): number {
  return Math.round(temp - 273.15);
}

export function formatWeather(weather: RawWeather): Weather {
  const {
    0: first,
    8: second,
    16: third,
    24: fourth,
    32: fifth,
  } = weather.list;
  return {
    city: {
      id: String(weather.city.id),
      name: weather.city.name,
    },
    forecast: [first, second, third, fourth, fifth].map((forecast) => ({
      day: DAYS[new Date(forecast.dt * 1000).getDay()],
      temp: kelvinToCelsius(forecast.main.temp),
      min: kelvinToCelsius(forecast.main.temp_min),
      max: kelvinToCelsius(forecast.main.temp_max),
      icon: forecast.weather[0].icon,
      humidity: forecast.main.humidity,
      visibility: forecast.visibility,    
      pressure: forecast.main.pressure,
    })),
  };
}

const api = {
  weather: {
    fetch: async (city: City): Promise<Weather> => {
      const request = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${
          city.name
        }&appid=${import.meta.env.VITE_API_KEY}`
      );
      const response: RawWeather = await request.json();

      return formatWeather(response);
    },
  },
};

export default api;
