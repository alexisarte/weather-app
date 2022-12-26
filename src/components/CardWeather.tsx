import React from 'react';

interface Forecast {
  day: string;
  min: number;
  max: number;
  icon: string;
  temp: number;
  humidity: number;
  visibility: number;
  pressure: number;
}

export default function CardWeather({ forecast }: { forecast: Forecast }) {
  return (
    <div className="flex flex-col ">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {forecast.day}
      </h5>
      <div className="flex justify-around">
        <img src={`http://openweathermap.org/img/wn/${forecast.icon}@2x.png`} />
        <h5 className="flex items-center text-5xl">{forecast.temp}°C</h5>
      </div>
      <ul className="grid grid-cols-2 text-center">
        <li>Humidity: {forecast.humidity}%</li>
        <li>Pressure: {forecast.pressure} mbar</li>
        <li>Visibility: {forecast.visibility}</li>
      </ul>
    </div>
  );
}
