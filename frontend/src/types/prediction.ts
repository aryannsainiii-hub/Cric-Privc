import type { TeamStrength } from './team';

export interface WinProbability {
  teamAProbability: number;
  teamBProbability: number;
  aiConfidence: number;
}

export interface KeyInsight {
  id: string;
  text: string;
}

export interface MatchPrediction {
  matchId: string;
  winProbability: WinProbability;
  insights: KeyInsight[];
  teamAStrength: TeamStrength;
  teamBStrength: TeamStrength;
}

export interface PlayerBattleStat {
  id: string;
  batterId: string;
  bowlerId: string;
  runsScored: number;
  ballsFaced: number;
  dismissals: number;
  strikeRate: number;
  batterAdvantage: number; // percent
}

export interface TossScenario {
  label: string;
  description: string;
  winProbability: number;
}

export interface PointsTableRow {
  teamId: string;
  played: number;
  won: number;
  lost: number;
  nrr: number;
  points: number;
  playoffProbability: number;
}

export interface ChampionshipOdds {
  teamId: string;
  probability: number;
}

export interface LiveMatchState {
  overs: number;
  score: number;
  wickets: number;
  currentRunRate: number;
  requiredRunRate: number;
  battingTeamId: string;
  probabilityTimeline: { over: number; teamAWinProb: number }[];
}
