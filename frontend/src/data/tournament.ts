import { PointsTableRow, ChampionshipOdds } from '../types/prediction';

export const pointsTable: PointsTableRow[] = [
  { teamId: 'kkr', played: 12, won: 8, lost: 3, nrr: 1.25, points: 17, playoffProbability: 92 },
  { teamId: 'rr', played: 12, won: 8, lost: 4, nrr: 0.62, points: 16, playoffProbability: 78 },
  { teamId: 'csk', played: 12, won: 7, lost: 5, nrr: 0.35, points: 15, playoffProbability: 65 },
  { teamId: 'srh', played: 12, won: 7, lost: 5, nrr: -0.10, points: 14, playoffProbability: 48 },
  { teamId: 'mi', played: 12, won: 6, lost: 6, nrr: -0.10, points: 12, playoffProbability: 30 },
  { teamId: 'gt', played: 12, won: 6, lost: 6, nrr: -0.22, points: 12, playoffProbability: 27 },
  { teamId: 'rcb', played: 12, won: 5, lost: 7, nrr: -0.30, points: 10, playoffProbability: 14 },
  { teamId: 'lsg', played: 12, won: 5, lost: 7, nrr: -0.45, points: 10, playoffProbability: 11 },
  { teamId: 'dc', played: 12, won: 4, lost: 8, nrr: -0.55, points: 8, playoffProbability: 4 },
  { teamId: 'pbks', played: 12, won: 3, lost: 9, nrr: -0.70, points: 6, playoffProbability: 1 },
];

export const championshipOdds: ChampionshipOdds[] = [
  { teamId: 'kkr', probability: 26 },
  { teamId: 'csk', probability: 22 },
  { teamId: 'rcb', probability: 18 },
  { teamId: 'rr', probability: 15 },
  { teamId: 'srh', probability: 8 },
  { teamId: 'mi', probability: 6 },
  { teamId: 'gt', probability: 3 },
  { teamId: 'lsg', probability: 1 },
  { teamId: 'dc', probability: 0.6 },
  { teamId: 'pbks', probability: 0.4 },
];

export const mostLikelyWinner = { teamId: 'kkr', probability: 26 };
