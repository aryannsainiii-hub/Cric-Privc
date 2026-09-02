import { teams, getTeamById } from '../data/teams';
import { getPlayersByTeam } from '../data/players';
import { simulateRequest } from './api';
import { Team } from '../types/team';
import { Player } from '../types/player';

export const getTeams = (): Promise<Team[]> => simulateRequest(teams);

export const getTeam = (teamId: string): Promise<Team | undefined> => simulateRequest(getTeamById(teamId));

export const getPlayersForTeam = (teamId: string): Promise<Player[]> => simulateRequest(getPlayersByTeam(teamId));
