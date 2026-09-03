import { featuredMatch } from '../data/matches';
import { simulateRequest, apiGet, apiPost } from './api';
import { Match } from '../types/match';
import { ApiMatch, ApiMatchCreatePayload, ApiPlayingXIRequest, ApiPlayingXIResponse } from '../types/api';

// Upcoming matches, match details, match creation, and Playing XI are
// Phase 2 features required to run through the real backend — no mock
// fallback for those. getFeaturedMatch() is the one exception: it
// backs the Home page's "Featured Match Intelligence" demo section,
// which stays on mock data along with the rest of the analytics/
// advanced features (see services/predictionService.ts).

const mapMatch = (m: ApiMatch): Match => ({
  id: m.id,
  teamAId: m.team_a_id,
  teamBId: m.team_b_id,
  venueId: m.venue_id,
  date: m.match_date,
  time: m.match_time.slice(0, 5), // "19:30:00" -> "19:30"
  dayNight: m.day_night as Match['dayNight'],
  matchType: m.match_type as Match['matchType'],
});

export const getUpcomingMatches = async (): Promise<Match[]> => {
  const matches = await apiGet<ApiMatch[]>('/matches/upcoming');
  return matches.map(mapMatch);
};

export const getMatch = async (id: string): Promise<Match | undefined> => {
  const match = await apiGet<ApiMatch>(`/matches/${id}`);
  return mapMatch(match);
};

export const getFeaturedMatch = (): Promise<Match> => simulateRequest(featuredMatch);

export interface CreateMatchInput {
  teamAId: string;
  teamBId: string;
  venueId: string;
  date: string;
  time: string;
  dayNight: 'Day' | 'Night' | 'Day/Night';
  matchType?: string;
}

export const createMatch = async (input: CreateMatchInput): Promise<Match> => {
  const payload: ApiMatchCreatePayload = {
    team_a_id: input.teamAId,
    team_b_id: input.teamBId,
    venue_id: input.venueId,
    match_date: input.date,
    // The backend's time type expects "HH:MM:SS" — the <input type="time">
    // element already gives "HH:MM", so pad seconds.
    match_time: input.time.length === 5 ? `${input.time}:00` : input.time,
    match_type: input.matchType ?? 'IPL League Match',
    day_night: input.dayNight,
  };
  const match = await apiPost<ApiMatch>('/matches', payload);
  return mapMatch(match);
};

export interface SubmitPlayingXIInput {
  matchId: string;
  teamAId: string;
  teamAPlayerIds: string[];
  teamBId: string;
  teamBPlayerIds: string[];
}

export const submitPlayingXI = async (input: SubmitPlayingXIInput): Promise<ApiPlayingXIResponse> => {
  const payload: ApiPlayingXIRequest = {
    team_a: { team_id: input.teamAId, player_ids: input.teamAPlayerIds },
    team_b: { team_id: input.teamBId, player_ids: input.teamBPlayerIds },
  };
  return apiPost<ApiPlayingXIResponse>(`/matches/${input.matchId}/playing-xi`, payload);
};

export const getPlayingXI = (matchId: string): Promise<ApiPlayingXIResponse> =>
  apiGet<ApiPlayingXIResponse>(`/matches/${matchId}/playing-xi`);
