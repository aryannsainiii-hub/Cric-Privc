import React, { useEffect, useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import MatchCard from '../components/match/MatchCard';
import LoadingScreen from '../components/common/LoadingScreen';
import { Match } from '../types/match';
import { getUpcomingMatches } from '../services/matchService';

const Matches: React.FC = () => {
  const [matches, setMatches] = useState<Match[] | null>(null);

  useEffect(() => {
    getUpcomingMatches().then(setMatches);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader title="IPL Matches" description="Every upcoming fixture, ready for deep analysis." />
      {!matches ? (
        <LoadingScreen label="Loading fixtures…" />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {matches.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Matches;
