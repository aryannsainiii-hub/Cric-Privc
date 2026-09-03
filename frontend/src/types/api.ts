// These interfaces mirror the FastAPI/Pydantic schemas in
// backend/schemas/*.py exactly (snake_case, as the backend serializes
// them). Services map these into the camelCase UI types under
// src/types/* — components never see these shapes directly.

export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface ApiTeam {
  id: string;
  name: string;
  short_name: string;
  primary_color: string;
  secondary_color: string;
  logo_url: string | null;
  created_at: string;
}

export interface ApiPlayer {
  id: string;
  name: string;
  team_id: string;
  role: string;
  batting_style: string | null;
  bowling_style: string | null;
  nationality: string | null;
  image_url: string | null;
  active_status: boolean;
  is_captain: boolean;
  is_wicketkeeper: boolean;
  form_score: number | null;
  impact_score: number | null;
  created_at: string;
}

// Lightweight — only the fields the frontend's venue *selection* UI
// needs. Full pitch analytics (surface, pace/spin turn, etc.) stay on
// the mock data layer until a later phase extends the backend model.
export interface ApiVenueSummary {
  id: string;
  name: string;
  city: string;
  state: string | null;
  average_first_innings_score: number;
  average_second_innings_score: number;
  batting_index: number;
  pace_index: number;
  spin_index: number;
  chasing_advantage: number;
  created_at: string;
}

export interface ApiMatch {
  id: string;
  team_a_id: string;
  team_b_id: string;
  venue_id: string;
  match_date: string; // "YYYY-MM-DD"
  match_time: string; // "HH:MM:SS"
  match_type: string;
  day_night: string;
  toss_winner_id: string | null;
  toss_decision: string | null;
  winner_id: string | null;
  status: string;
  created_at: string;
}

export interface ApiMatchCreatePayload {
  team_a_id: string;
  team_b_id: string;
  venue_id: string;
  match_date: string;
  match_time: string;
  match_type?: string;
  day_night: 'Day' | 'Night' | 'Day/Night';
}

export interface ApiPlayingXISubmission {
  team_id: string;
  player_ids: string[];
}

export interface ApiPlayingXIRequest {
  team_a: ApiPlayingXISubmission;
  team_b: ApiPlayingXISubmission;
}

export interface ApiPlayingXIResponse {
  match_id: string;
  team_a_id: string;
  team_b_id: string;
  team_a_player_ids: string[];
  team_b_player_ids: string[];
}

export interface ApiPredictionRequest {
  match_id?: string;
  team_a_id: string;
  team_b_id: string;
  venue_id: string;
}

export interface ApiKeyInsight {
  id: string;
  text: string;
}

export interface ApiPredictionResponse {
  prediction_status: string;
  match_id: string | null;
  team_a_id: string;
  team_b_id: string;
  team_a_probability: number;
  team_b_probability: number;
  confidence_score: number;
  predicted_winner_id: string;
  insights: ApiKeyInsight[];
  disclaimer: string;
}
