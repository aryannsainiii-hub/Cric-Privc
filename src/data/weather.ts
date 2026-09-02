import { WeatherSnapshot } from '../types/match';

// Structured to be swapped for a live weather API response in Phase 2.
export const weatherByVenue: Record<string, WeatherSnapshot> = {
  wankhede: { venueId: 'wankhede', temperatureC: 28, humidity: 74, windSpeedKmh: 12, cloudCover: 60, rainProbability: 10, dewIndex: 'High', condition: 'Partly Cloudy' },
  chepauk: { venueId: 'chepauk', temperatureC: 31, humidity: 68, windSpeedKmh: 9, cloudCover: 30, rainProbability: 5, dewIndex: 'Medium', condition: 'Clear' },
  chinnaswamy: { venueId: 'chinnaswamy', temperatureC: 24, humidity: 55, windSpeedKmh: 15, cloudCover: 45, rainProbability: 20, dewIndex: 'Low', condition: 'Partly Cloudy' },
  eden: { venueId: 'eden', temperatureC: 29, humidity: 78, windSpeedKmh: 10, cloudCover: 65, rainProbability: 25, dewIndex: 'High', condition: 'Overcast' },
  sawaimansingh: { venueId: 'sawaimansingh', temperatureC: 33, humidity: 40, windSpeedKmh: 14, cloudCover: 15, rainProbability: 2, dewIndex: 'Low', condition: 'Clear' },
  'arun-jaitley': { venueId: 'arun-jaitley', temperatureC: 30, humidity: 50, windSpeedKmh: 11, cloudCover: 35, rainProbability: 8, dewIndex: 'Medium', condition: 'Clear' },
  mullanpur: { venueId: 'mullanpur', temperatureC: 27, humidity: 60, windSpeedKmh: 13, cloudCover: 40, rainProbability: 15, dewIndex: 'Medium', condition: 'Partly Cloudy' },
  uppal: { venueId: 'uppal', temperatureC: 32, humidity: 45, windSpeedKmh: 10, cloudCover: 20, rainProbability: 5, dewIndex: 'Low', condition: 'Clear' },
  ekana: { venueId: 'ekana', temperatureC: 26, humidity: 65, windSpeedKmh: 8, cloudCover: 55, rainProbability: 18, dewIndex: 'Medium', condition: 'Partly Cloudy' },
  'narendra-modi': { venueId: 'narendra-modi', temperatureC: 34, humidity: 35, windSpeedKmh: 16, cloudCover: 10, rainProbability: 0, dewIndex: 'Low', condition: 'Clear' },
};

export const getWeatherForVenue = (venueId: string): WeatherSnapshot =>
  weatherByVenue[venueId] ?? weatherByVenue['wankhede'];
