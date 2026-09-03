import { apiGet } from './api';
import { ApiVenueSummary } from '../types/api';

// Venue selection is one of the Phase 2 features required to run
// through the real backend. This intentionally returns a lightweight
// summary shape (id/name/city + the four backend index fields) — full
// pitch analytics (surface, pace/spin turn, etc.) live only on the
// mock data layer (frontend/src/data/venues.ts) until a later phase
// extends the backend Venue model with those fields.
export interface VenueSummary {
  id: string;
  name: string;
  city: string;
  battingIndex: number;
  paceIndex: number;
  spinIndex: number;
  chasingAdvantage: number;
}

const mapVenue = (v: ApiVenueSummary): VenueSummary => ({
  id: v.id,
  name: v.name,
  city: v.city,
  battingIndex: v.batting_index,
  paceIndex: v.pace_index,
  spinIndex: v.spin_index,
  chasingAdvantage: v.chasing_advantage,
});

export const getVenues = async (): Promise<VenueSummary[]> => {
  const venues = await apiGet<ApiVenueSummary[]>('/venues');
  return venues.map(mapVenue);
};

export const getVenueById = async (venueId: string): Promise<VenueSummary | undefined> => {
  const venue = await apiGet<ApiVenueSummary>(`/venues/${venueId}`);
  return mapVenue(venue);
};
