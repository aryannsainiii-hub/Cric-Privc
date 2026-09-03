import React, { useEffect, useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import PlayerBattle from '../components/analytics/PlayerBattle';
import LoadingScreen from '../components/common/LoadingScreen';
import { getPlayerBattles } from '../services/predictionService';
import { PlayerBattleStat } from '../types/prediction';

const PlayerBattles: React.FC = () => {
  const [battles, setBattles] = useState<PlayerBattleStat[] | null>(null);

  useEffect(() => {
    getPlayerBattles().then(setBattles);
  }, []);

  if (!battles) return <LoadingScreen label="Loading head-to-head records…" />;

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader title="Key Player Battles" description="Historical head-to-head matchups for the selected fixture." />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {battles.map((b) => (
          <PlayerBattle key={b.id} battle={b} />
        ))}
      </div>
    </div>
  );
};

export default PlayerBattles;
