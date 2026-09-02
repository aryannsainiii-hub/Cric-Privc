import { upcomingMatches, featuredMatch, getMatchById } from '../data/matches';
import { venues, getVenueById } from '../data/venues';
import { simulateRequest } from './api';
import { Match, Venue } from '../types/match';

export const getUpcomingMatches = (): Promise<Match[]> => simulateRequest(upcomingMatches);

export const getFeaturedMatch = (): Promise<Match> => simulateRequest(featuredMatch);

export const getMatch = (id: string): Promise<Match | undefined> => simulateRequest(getMatchById(id));

export const getVenues = (): Promise<Venue[]> => simulateRequest(venues);

export const getVenue = (id: string): Promise<Venue | undefined> => simulateRequest(getVenueById(id));
