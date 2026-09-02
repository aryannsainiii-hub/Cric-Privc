import { getWeatherForVenue } from '../data/weather';
import { simulateRequest } from './api';
import { WeatherSnapshot } from '../types/match';

// Phase 2 target: GET https://api.weatherprovider.com/v1/venues/:id
export const getWeatherData = (venueId: string): Promise<WeatherSnapshot> =>
  simulateRequest(getWeatherForVenue(venueId));
