import React, { useEffect, useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import TossSimulator from '../components/match/TossSimulator';
import LoadingScreen from '../components/common/LoadingScreen';
import { getTossScenarios } from '../services/predictionService';
import { TossScenario } from '../types/prediction';
import { getTeamById } from '../data/teams';
import { useMatch } from '../context/MatchContext';

const TossImpact: React.FC = () => {
  const { config } = useMatch();
  const [scenarios, setScenarios] = useState<TossScenario[] | null>(null);
  const teamA = getTeamById(config.teamAId);
  const teamB = getTeamById(config.teamBId);

  useEffect(() => {
    getTossScenarios(config.teamAId, config.teamBId, config.venueId).then(setScenarios);
  }, [config.teamAId, config.teamBId, config.venueId]);

  if (!scenarios || !teamA || !teamB) return <LoadingScreen label="Simulating toss scenarios…" />;

  const labelled = scenarios.map((s) => ({
    ...s,
    label: s.label.replace('Team A', teamA.shortName).replace('Team B', teamB.shortName),
  }));

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader title="Toss Impact Analysis" description="See how each toss decision could change the match outcome." />
      <TossSimulator scenarios={labelled} />
    </div>
  );
};

export default TossImpact;
