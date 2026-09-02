import { getTeamById } from './teams';
import { getVenueById } from './venues';
import { getWeatherForVenue } from './weather';
import { MatchPrediction, PlayerBattleStat, TossScenario } from '../types/prediction';
import { TeamStrength } from '../types/team';

// ---------------------------------------------------------------------
// This file simulates a prediction engine with deterministic, explainable
// math over structured mock data. In Phase 4 this entire module is
// replaced by calls into the trained ML service — the function
// signatures below (getStrengthForTeam, computeWinProbability) are the
// contract the real model will fulfil.
// ---------------------------------------------------------------------

const formPercentage = (form: number[]) => Math.round((form.filter((r) => r === 1).length / form.length) * 100);

export const getStrengthForTeam = (teamId: string, venueId: string, opponentId: string): TeamStrength => {
  const team = getTeamById(teamId);
  const venue = getVenueById(venueId);
  const recentForm = team ? formPercentage(team.form) : 50;
  // Simple deterministic seed from id chars so numbers stay stable per team/venue pair.
  const seed = (teamId + venueId + opponentId).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const jitter = (offset: number) => 60 + ((seed + offset) % 30);

  return {
    batting: jitter(1),
    bowling: jitter(7),
    recentForm,
    venueRecord: venue ? Math.round((venue.battingFriendliness + venue.chasingAdvantage) / 2) : jitter(3),
    playingXIStrength: jitter(11),
  };
};

const overallScore = (s: TeamStrength) =>
  s.batting * 0.25 + s.bowling * 0.25 + s.recentForm * 0.2 + s.venueRecord * 0.15 + s.playingXIStrength * 0.15;

export const computeWinProbability = (teamAId: string, teamBId: string, venueId: string) => {
  const a = getStrengthForTeam(teamAId, venueId, teamBId);
  const b = getStrengthForTeam(teamBId, venueId, teamAId);
  const aScore = overallScore(a);
  const bScore = overallScore(b);
  const total = aScore + bScore;
  const teamAProbability = Math.round((aScore / total) * 100);
  const teamBProbability = 100 - teamAProbability;
  const spread = Math.abs(teamAProbability - teamBProbability);
  const aiConfidence = Math.min(96, 55 + Math.round(spread * 0.9));
  return { teamAProbability, teamBProbability, aiConfidence, teamAStrength: a, teamBStrength: b };
};

export const buildMatchPrediction = (matchId: string, teamAId: string, teamBId: string, venueId: string): MatchPrediction => {
  const { teamAProbability, teamBProbability, aiConfidence, teamAStrength, teamBStrength } = computeWinProbability(teamAId, teamBId, venueId);
  const teamA = getTeamById(teamAId);
  const teamB = getTeamById(teamBId);
  const venue = getVenueById(venueId);
  const weather = getWeatherForVenue(venueId);
  const favouredTeam = teamAProbability >= teamBProbability ? teamA : teamB;

  const insights = [
    { id: 'i1', text: `Strong recent form favours ${favouredTeam?.name ?? 'the home side'}.` },
    { id: 'i2', text: `${venue?.name ?? 'This venue'} historically offers a slight edge to teams batting ${
      (venue?.chasingAdvantage ?? 50) > 50 ? 'second' : 'first'
    }.` },
    { id: 'i3', text: weather.dewIndex === 'High'
      ? 'High dew probability under lights could aid the chasing side in the second innings.'
      : `${venue?.spinAssistance ?? 0 > 50 ? 'Spin' : 'Pace'} could be the difference on a surface rated ${venue?.surface.toLowerCase() ?? 'balanced'}.` },
  ];

  return {
    matchId,
    winProbability: { teamAProbability, teamBProbability, aiConfidence },
    insights,
    teamAStrength,
    teamBStrength,
  };
};

export const buildTossScenarios = (teamAId: string, teamBId: string, venueId: string): TossScenario[] => {
  const base = computeWinProbability(teamAId, teamBId, venueId).teamAProbability;
  const venue = getVenueById(venueId);
  const chaseBoost = Math.round(((venue?.chasingAdvantage ?? 50) - 50) / 3);
  return [
    { label: 'Team A wins toss, chooses to bat', description: 'Sets a target and bats first on a fresh surface.', winProbability: Math.min(95, Math.max(5, base - chaseBoost)) },
    { label: 'Team A wins toss, chooses to bowl', description: 'Chases under lights, banking on dew and chasing form.', winProbability: Math.min(95, Math.max(5, base + chaseBoost)) },
    { label: 'Team B wins toss, chooses to bat', description: 'Opposition sets the target first.', winProbability: Math.min(95, Math.max(5, 100 - base - chaseBoost)) },
    { label: 'Team B wins toss, chooses to bowl', description: 'Opposition chases, favoured by conditions.', winProbability: Math.min(95, Math.max(5, 100 - base + chaseBoost)) },
  ];
};

// Fixed demonstration player-battle dataset for the MI vs CSK marquee fixture.
export const playerBattles: PlayerBattleStat[] = [
  { id: 'pb1', batterId: 'mi-1', bowlerId: 'csk-9', runsScored: 146, ballsFaced: 98, dismissals: 3, strikeRate: 148.9, batterAdvantage: 62 },
  { id: 'pb2', batterId: 'mi-3', bowlerId: 'csk-11', runsScored: 58, ballsFaced: 44, dismissals: 2, strikeRate: 131.8, batterAdvantage: 47 },
  { id: 'pb3', batterId: 'mi-5', bowlerId: 'csk-5', runsScored: 112, ballsFaced: 76, dismissals: 1, strikeRate: 147.3, batterAdvantage: 71 },
  { id: 'pb4', batterId: 'csk-1', bowlerId: 'mi-9', runsScored: 34, ballsFaced: 41, dismissals: 4, strikeRate: 82.9, batterAdvantage: 29 },
  { id: 'pb5', batterId: 'csk-3', bowlerId: 'mi-11', runsScored: 89, ballsFaced: 58, dismissals: 2, strikeRate: 153.4, batterAdvantage: 58 },
];
