import React from 'react';
import { Thermometer, Droplets, Wind, Cloud, CloudRain, Sparkles } from 'lucide-react';
import { WeatherSnapshot } from '../../types/match';
import Card from '../common/Card';

const stat = (icon: React.ReactNode, label: string, value: string) => (
  <div className="flex items-center gap-3 rounded-xl border border-white/8 p-3">
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-electric/10 text-electric">{icon}</span>
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm font-medium text-white">{value}</p>
    </div>
  </div>
);

const impactCopy = (weather: WeatherSnapshot) => {
  if (weather.dewIndex === 'High') {
    return 'High humidity and expected dew under lights could provide an advantage to the team chasing in the second innings.';
  }
  if (weather.rainProbability > 20) {
    return 'A meaningful rain probability introduces schedule risk — a Duckworth-Lewis-affected chase is plausible.';
  }
  return 'Clear, dry conditions favour stroke-play with limited interference from atmosphere on either innings.';
};

const WeatherAnalysis: React.FC<{ weather: WeatherSnapshot; venueName: string }> = ({ weather, venueName }) => (
  <Card className="flex flex-col gap-5">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-display text-xl text-white">Weather Intelligence</h3>
        <p className="text-sm text-slate-400">{venueName} · {weather.condition}</p>
      </div>
      <div className="text-right">
        <p className="font-display text-3xl text-white">{weather.temperatureC}°C</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3">
      {stat(<Thermometer className="h-4 w-4" />, 'Temperature', `${weather.temperatureC}°C`)}
      {stat(<Droplets className="h-4 w-4" />, 'Humidity', `${weather.humidity}%`)}
      {stat(<Wind className="h-4 w-4" />, 'Wind Speed', `${weather.windSpeedKmh} km/h`)}
      {stat(<Cloud className="h-4 w-4" />, 'Cloud Cover', `${weather.cloudCover}%`)}
      {stat(<CloudRain className="h-4 w-4" />, 'Rain Probability', `${weather.rainProbability}%`)}
      {stat(<Sparkles className="h-4 w-4" />, 'Dew Index', weather.dewIndex)}
    </div>

    <div className="rounded-xl border border-electric/20 bg-electric/[0.04] p-4">
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-electric">Cricket Impact Analysis</p>
      <p className="text-sm text-slate-300">{impactCopy(weather)}</p>
    </div>
  </Card>
);

export default WeatherAnalysis;
