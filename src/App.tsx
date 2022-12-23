import type { City } from './types';
import React, { useEffect, useState } from 'react';
import api, { type Weather } from './api';
import CardWeather from './components/CardWeather';

const CITIES = [
  {id: 'la-plata', name: 'La Plata'},
  { id: 'buenos-aires', name: 'Buenos Aires'},
  { id: 'cordoba', name: 'Córdoba'},
  { id: 'mendoza', name: 'Mendoza'},
  { id: 'rosario', name: 'Rosario'},
];

function App() {
  const [status, setStatus] = useState<'pending' | 'success'>('pending');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [city, setCity] = useState<City>(CITIES[0]);

  const handleChangeCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = event.target.value;
    const city = CITIES.find((city) => city.id === cityId) || CITIES[0];
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
    <>
      <main>
        <select value={city?.id} onChange={handleChangeCity}>
          {CITIES.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
        <h1>{weather.city.name}</h1>
      </main>
      <div className="grid grid-cols-4 gap-4 bg-blue-500 p-4">
        {weather.forecast.map((forecast, index) => (
          <div key={index} className="w-3/4">
            <CardWeather forecast={forecast} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
