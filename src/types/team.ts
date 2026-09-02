export interface Team {
  id: string;
  name: string;
  shortName: string;
  primaryColor: string;
  secondaryColor: string;
  logoInitials: string;
  homeVenueId: string;
  form: number[]; // last 5 results, 1 = win, 0 = loss
}

export interface TeamStrength {
  batting: number;
  bowling: number;
  recentForm: number;
  venueRecord: number;
  playingXIStrength: number;
}
