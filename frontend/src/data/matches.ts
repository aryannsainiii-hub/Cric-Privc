import { Match } from '../types/match';

export const upcomingMatches: Match[] = [
  { id: 'm1', teamAId: 'mi', teamBId: 'csk', venueId: 'wankhede', date: '2026-09-05', time: '19:30', dayNight: 'Night', matchType: 'IPL League Match' },
  { id: 'm2', teamAId: 'rcb', teamBId: 'kkr', venueId: 'chinnaswamy', date: '2026-09-06', time: '19:30', dayNight: 'Night', matchType: 'IPL League Match' },
  { id: 'm3', teamAId: 'rr', teamBId: 'dc', venueId: 'sawaimansingh', date: '2026-09-07', time: '15:30', dayNight: 'Day/Night', matchType: 'IPL League Match' },
  { id: 'm4', teamAId: 'pbks', teamBId: 'srh', venueId: 'mullanpur', date: '2026-09-08', time: '19:30', dayNight: 'Night', matchType: 'IPL League Match' },
  { id: 'm5', teamAId: 'gt', teamBId: 'lsg', venueId: 'narendra-modi', date: '2026-09-09', time: '19:30', dayNight: 'Night', matchType: 'IPL League Match' },
  { id: 'm6', teamAId: 'csk', teamBId: 'rcb', venueId: 'chepauk', date: '2026-09-10', time: '19:30', dayNight: 'Night', matchType: 'IPL League Match' },
];

export const featuredMatch: Match = upcomingMatches[0];

export const getMatchById = (id: string): Match | undefined => upcomingMatches.find((m) => m.id === id);
