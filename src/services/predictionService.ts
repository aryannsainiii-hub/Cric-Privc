import { buildMatchPrediction, buildTossScenarios, playerBattles } from '../data/predictions';
import { pointsTable, championshipOdds } from '../data/tournament';
import { simulateRequest } from './api';
import { MatchPrediction, PlayerBattleStat, PointsTableRow, ChampionshipOdds, TossScenario } from '../types/prediction';

// Phase 4 will replace the body of these functions with real POST calls
// to the trained model service, e.g.
// POST /predictions { matchId, teamA, teamB, playingXI, venue, weather }
// The response contract (MatchPrediction) is intentionally unchanged.

export const getPrediction = (matchId: string, teamAId: string, teamBId: string, venueId: string): Promise<MatchPrediction> =>
  simulateRequest(buildMatchPrediction(matchId, teamAId, teamBId, venueId), 600);

export const getTossScenarios = (teamAId: string, teamBId: string, venueId: string): Promise<TossScenario[]> =>
  simulateRequest(buildTossScenarios(teamAId, teamBId, venueId));

export const getPlayerBattles = (): Promise<PlayerBattleStat[]> => simulateRequest(playerBattles);

export const getPointsTable = (): Promise<PointsTableRow[]> => simulateRequest(pointsTable);

export const getChampionshipOdds = (): Promise<ChampionshipOdds[]> => simulateRequest(championshipOdds);
