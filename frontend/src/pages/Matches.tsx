import React, { useEffect, useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import MatchCard from '../components/match/MatchCard';
import LoadingScreen from '../components/common/LoadingScreen';
import ErrorState from '../components/common/ErrorState';
import { Match } from '../types/match';
import { Team } from '../types/team';
import { getUpcomingMatches } from '../services/matchService';
import { getTeams } from '../services/teamService';
import { getVenues, VenueSummary } from '../services/venueService';

const Matches: React.FC = () => {
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [venues, setVenues] = useState<VenueSummary[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setError(null);
    setMatches(null);
    Promise.all([getUpcomingMatches(), getTeams(), getVenues()])
      .then(([m, t, v]) => {
        setMatches(m);
        setTeams(t);
        setVenues(v);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Unable to load fixtures from the backend.'));
  };

  useEffect(() => {
    load();
  }, []);

  const teamById = (id: string) => teams.find((t) => t.id === id);
  const venueById = (id: string) => venues.find((v) => v.id === id);

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader title="IPL Matches" description="Every upcoming fixture, ready for deep analysis." />
      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : !matches ? (
        <LoadingScreen label="Loading fixtures…" />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {matches.map((m) => (
            <MatchCard key={m.id} match={m} teamA={teamById(m.teamAId)} teamB={teamById(m.teamBId)} venue={venueById(m.venueId)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Matches;
