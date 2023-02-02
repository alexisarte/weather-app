import type { City } from './types';
import React, { useEffect, useState } from 'react';
import api, { type Weather } from './api';
import CardWeather from './components/CardWeather';

const CITIES = [
  { id: 'la-plata', name: 'La Plata' },
  { id: 'buenos-aires', name: 'Buenos Aires' },
  { id: 'cordoba', name: 'Córdoba' },
  { id: 'mendoza', name: 'Mendoza' },
  { id: 'rosario', name: 'Rosario' },
];

function App() {
  const [status, setStatus] = useState<'pending' | 'success'>('pending');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [city, setCity] = useState<City>(CITIES[0]);

  const handleChangeCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = CITIES.find((city) => city.id === e.target.value) || CITIES[0];
    setCity(city);
    api.weather.fetch(city).then((weather) => {
      setWeather(weather);
      setStatus('success');
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        api.weather.fetchByCoords(position.coords.latitude, position.coords.longitude).then((weather) => {
          setWeather(weather);
          setStatus('success');
        });
      });
    }
  }, []);

  if (status === 'pending') {
    return <div>Cargando...</div>;
  }

  if (!weather) {
    return <div>La ciudad no existe o no hay datos del clima</div>;
  }

  return (
    <div className="bg-blue-400 min-h-screen py-12 text-white">
      <main className="text-center">
        <select
          value={city?.id}
          onChange={handleChangeCity}
          className="w-64 h-10 rounded-xl bg-white text-gray-700 dark:text-gray-400"
        >
          {CITIES.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
        <h1 className="m-4 text-3xl">{weather.city.name}</h1>
      </main>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-4 p-4">
        {weather.forecast.map((forecast, index) => (
          <div key={index} className="p-4 rounded-xl border">
            <CardWeather forecast={forecast} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
