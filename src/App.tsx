import React, { useEffect, useState } from 'react';
import api, { Weather } from './api';

function App() {
  const [status, setStatus] = useState<'pending' | 'success'>('pending');
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    api.weather.fetch(0, 0).then((whater) => {
      setWeather(whater);
      setStatus('success');
    });
  }, []);

  if (status === 'pending') {
    return <div>Cargando...</div>;
  }

  if (!weather) {
    return <div>La ciudad no existe o no hay datos del clima</div>;
  }

  return (
    <main>
      <h1>{weather.city.name}</h1>
      <ul>
        {weather.forecast.map((forecast, index) => (
          <li key={index}>
            Min: {forecast.min} - Max: {forecast.max}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
