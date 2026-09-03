import { buildMatchPrediction, buildTossScenarios, playerBattles } from '../data/predictions';
import { pointsTable, championshipOdds } from '../data/tournament';
import { simulateRequest, apiPost } from './api';
import { MatchPrediction, PlayerBattleStat, PointsTableRow, ChampionshipOdds, TossScenario } from '../types/prediction';
import { ApiPredictionRequest, ApiPredictionResponse } from '../types/api';

// Prediction Dashboard, toss scenarios, player battles, and tournament
// odds are "advanced/analytics" features per the Phase 2 spec and
// intentionally remain on the same deterministic mock engine shipped
// in Phase 1 (frontend/src/data/predictions.ts) — not wired to the
// backend yet, so nothing below changes behavior.
//
// Phase 4 will replace the body of these functions with real calls to
// the trained model service. The response contract (MatchPrediction)
// is intentionally unchanged.

export const getPrediction = (matchId: string, teamAId: string, teamBId: string, venueId: string): Promise<MatchPrediction> =>
  simulateRequest(buildMatchPrediction(matchId, teamAId, teamBId, venueId), 600);

export const getTossScenarios = (teamAId: string, teamBId: string, venueId: string): Promise<TossScenario[]> =>
  simulateRequest(buildTossScenarios(teamAId, teamBId, venueId));

export const getPlayerBattles = (): Promise<PlayerBattleStat[]> => simulateRequest(playerBattles);

export const getPointsTable = (): Promise<PointsTableRow[]> => simulateRequest(pointsTable);

export const getChampionshipOdds = (): Promise<ChampionshipOdds[]> => simulateRequest(championshipOdds);

// ---------------------------------------------------------------------
// Real backend call, per the Phase 2 spec (POST /api/predictions/match).
// Not wired into any page yet — the Prediction Dashboard still uses the
// mock getPrediction() above so Phase 1's UX is untouched — but this is
// fully functional against the backend today and is where a future
// phase should plug in once ready to switch the dashboard over.
// ---------------------------------------------------------------------
export const generatePrediction = (
  teamAId: string,
  teamBId: string,
  venueId: string,
  matchId?: string
): Promise<ApiPredictionResponse> => {
  const payload: ApiPredictionRequest = { team_a_id: teamAId, team_b_id: teamBId, venue_id: venueId, match_id: matchId };
  return apiPost<ApiPredictionResponse>('/predictions/match', payload);
};
