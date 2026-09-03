import React, { useEffect, useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import WeatherAnalysis from '../components/analytics/WeatherAnalysis';
import LoadingScreen from '../components/common/LoadingScreen';
import { getVenueById } from '../data/venues';
import { getWeatherData } from '../services/weatherService';
import { WeatherSnapshot } from '../types/match';
import { useMatch } from '../context/MatchContext';

const WeatherIntelligence: React.FC = () => {
  const { config } = useMatch();
  const venue = getVenueById(config.venueId);
  const [weather, setWeather] = useState<WeatherSnapshot | null>(null);

  useEffect(() => {
    getWeatherData(config.venueId).then(setWeather);
  }, [config.venueId]);

  if (!venue || !weather) return <LoadingScreen label="Fetching venue weather…" />;

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <SectionHeader title="Weather Intelligence" description="Real-time conditions and their expected impact on play." />
      <WeatherAnalysis weather={weather} venueName={venue.name} />
      <p className="text-xs text-slate-500">
        Mock weather data for Phase 1. The data layer is structured so a live weather API can be substituted without
        changing this page.
      </p>
    </div>
  );
};

export default WeatherIntelligence;
