import { apiGet } from './api';
import { ApiPlayer } from '../types/api';
import { Player, PlayerRole } from '../types/player';

// Player lists are one of the Phase 2 features required to run through
// the real backend — no mock fallback here.

const mapPlayer = (p: ApiPlayer): Player => ({
  id: p.id,
  teamId: p.team_id,
  name: p.name,
  role: p.role as PlayerRole,
  isCaptain: p.is_captain,
  isWicketkeeper: p.is_wicketkeeper,
  // Neutral fallback for a seeded player missing a score, rather than
  // fabricating a specific number.
  formScore: p.form_score ?? 50,
  impactScore: p.impact_score ?? 50,
});

export const getPlayers = async (filters?: { role?: string; teamId?: string }): Promise<Player[]> => {
  const params = new URLSearchParams();
  if (filters?.role) params.set('role', filters.role);
  if (filters?.teamId) params.set('team_id', filters.teamId);
  const query = params.toString() ? `?${params.toString()}` : '';
  const players = await apiGet<ApiPlayer[]>(`/players${query}`);
  return players.map(mapPlayer);
};

export const getPlayerById = async (playerId: string): Promise<Player | undefined> => {
  const player = await apiGet<ApiPlayer>(`/players/${playerId}`);
  return mapPlayer(player);
};

export const getPlayersByTeam = async (teamId: string): Promise<Player[]> => {
  const players = await apiGet<ApiPlayer[]>(`/teams/${teamId}/players`);
  return players.map(mapPlayer);
};
