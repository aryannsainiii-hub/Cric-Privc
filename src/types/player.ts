export type PlayerRole = 'Batter' | 'Bowler' | 'All-rounder' | 'Wicketkeeper';

export interface Player {
  id: string;
  teamId: string;
  name: string;
  role: PlayerRole;
  isCaptain?: boolean;
  isWicketkeeper?: boolean;
  formScore: number; // 0-100
  impactScore: number; // 0-100
}
