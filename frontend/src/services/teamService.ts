import { apiGet, ApiRequestError } from './api';
import { ApiTeam } from '../types/api';
import { Team } from '../types/team';

// Team selection is one of the Phase 2 features required to run through
// the real backend — no mock fallback here. If the API is unreachable,
// these reject and calling pages show a proper error state.

const mapTeam = (t: ApiTeam): Team => ({
  id: t.id,
  name: t.name,
  shortName: t.short_name,
  primaryColor: t.primary_color,
  secondaryColor: t.secondary_color,
  // The backend doesn't track logo initials separately — every seeded
  // team's initials equal its short name, so this stays visually
  // identical to Phase 1.
  logoInitials: t.short_name,
});

export const getTeams = async (): Promise<Team[]> => {
  const teams = await apiGet<ApiTeam[]>('/teams');
  return teams.map(mapTeam);
};

export const getTeamById = async (teamId: string): Promise<Team | undefined> => {
  try {
    const team = await apiGet<ApiTeam>(`/teams/${teamId}`);
    return mapTeam(team);
  } catch (err) {
    // A real 404 means "not found" — that's a legitimate undefined.
    // Any other failure (network down, 500, etc.) is a genuine error
    // and should surface, not be swallowed into a blank state.
    if (err instanceof ApiRequestError && err.status === 404) return undefined;
    throw err;
  }
};
