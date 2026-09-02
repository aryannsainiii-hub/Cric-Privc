export interface Venue {
  id: string;
  name: string;
  city: string;
  avgFirstInningsScore: number;
  avgSecondInningsScore: number;
  battingFriendliness: number; // 0-100
  paceAssistance: number; // 0-100
  spinAssistance: number; // 0-100
  chasingAdvantage: number; // 0-100
  pitchType: 'Batting-friendly' | 'Balanced' | 'Bowling-friendly';
  surface: 'Good' | 'Dry' | 'Slow' | 'Cracked';
  paceBounce: 'Low' | 'Medium' | 'High';
  spinTurn: 'Low' | 'Medium' | 'High';
}

export interface WeatherSnapshot {
  venueId: string;
  temperatureC: number;
  humidity: number;
  windSpeedKmh: number;
  cloudCover: number;
  rainProbability: number;
  dewIndex: 'Low' | 'Medium' | 'High';
  condition: 'Clear' | 'Partly Cloudy' | 'Overcast' | 'Light Rain';
}

export interface Match {
  id: string;
  teamAId: string;
  teamBId: string;
  venueId: string;
  date: string;
  time: string;
  dayNight: 'Day' | 'Night' | 'Day/Night';
  matchType: 'IPL League Match' | 'Qualifier' | 'Eliminator' | 'Final';
}
