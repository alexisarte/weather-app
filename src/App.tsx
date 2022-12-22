import type { City } from './types';
import React, { useEffect, useState } from 'react';
import api, {type Weather } from './api';

const CITIES = [
  { id: 'quilmes', name: 'Quilmes', lat: -34.72, lon: -58.27 },
  { id: 'buenos-aires', name: 'Buenos Aires', lat: -34.61, lon: -58.37 },
  { id: 'cordoba', name: 'Córdoba', lat: -31.42, lon: -64.19 },
  { id: 'mendoza', name: 'Mendoza', lat: -32.89, lon: -68.83 },
  { id: 'rosario', name: 'Rosario', lat: -32.95, lon: -60.67 },
];

function App() {
  const [status, setStatus] = useState<'pending' | 'success'>('pending');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [city, setCity] = useState<City>(CITIES[0]);

  const handleChangeCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = event.target.value;
    const city
      = CITIES.find((city) => city.id === cityId)
      || CITIES[0];
    setCity(city);
  };

  useEffect(() => {
    api.weather.fetch(city).then((whater) => {
      setWeather(whater);
      setStatus('success');
    });
  }, [city]);

  if (status === 'pending') {
    return <div>Cargando...</div>;
  }

  if (!weather) {
    return <div>La ciudad no existe o no hay datos del clima</div>;
  }

  return (
    <main>
      <select value={city?.id} onChange={handleChangeCity}>
        {CITIES.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
      <h1>{weather.city.name}</h1>
      <ul>
        {weather.forecast.map((forecast, index) => (
          <li key={index}>
            {forecast.date}: Min: {forecast.min} °C, Max: {forecast.max} °C
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
