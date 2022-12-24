import React from 'react';

interface Forecast {
  day: string;
  min: number;
  max: number;
  icon: string;
  temp: number;
  humidity: number;
  visibility: number;
}

export default function CardWeather({ forecast }: { forecast: Forecast }) {
  return (
    <div>
      <img src={`http://openweathermap.org/img/wn/${forecast.icon}@2x.png`} />
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {forecast.day}
      </h5>
      <ul>
        <li>{forecast.temp} °C</li>
        <li>Humidity: {forecast.humidity}</li>
        <li>Visibility: {forecast.visibility}</li>
      </ul>
    </div>
  );
}
