import React from 'react';

import {Card} from 'flowbite-react';

interface Forecast {
  day: string;
  min: number;
  max: number;
  icon: string;
  temp: number;
}

export default function CardWeather({ forecast }: { forecast: Forecast }) {
  return (
    <div className="max-w-sm">
      <Card imgSrc={`http://openweathermap.org/img/wn/${forecast.icon}@2x.png`}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {forecast.day}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {forecast.temp} °C
        </p>
      </Card>
    </div>
  );
}
