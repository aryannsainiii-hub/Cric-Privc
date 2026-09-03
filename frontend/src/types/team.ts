export interface Team {
  id: string;
  name: string;
  shortName: string;
  primaryColor: string;
  secondaryColor: string;
  logoInitials: string;
  // Optional: only populated by the local mock data layer (used by the
  // still-mock analytics pages). Teams fetched from the backend omit
  // these since Phase 2's Team model doesn't track them yet.
  homeVenueId?: string;
  form?: number[]; // last 5 results, 1 = win, 0 = loss
}

export interface TeamStrength {
  batting: number;
  bowling: number;
  recentForm: number;
  venueRecord: number;
  playingXIStrength: number;
}
