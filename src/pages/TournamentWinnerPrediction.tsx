import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import LoadingScreen from '../components/common/LoadingScreen';
import { getTeamById } from '../data/teams';
import { getChampionshipOdds } from '../services/predictionService';
import { ChampionshipOdds } from '../types/prediction';

const TournamentWinnerPrediction: React.FC = () => {
  const [odds, setOdds] = useState<ChampionshipOdds[] | null>(null);

  useEffect(() => {
    getChampionshipOdds().then(setOdds);
  }, []);

  if (!odds) return <LoadingScreen label="Projecting championship odds…" />;

  const sorted = [...odds].sort((a, b) => b.probability - a.probability);
  const leader = sorted[0];
  const leaderTeam = getTeamById(leader.teamId);
  const totalCheck = odds.reduce((sum, o) => sum + o.probability, 0);

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="IPL Winner Prediction"
        description="Cric Privé's projected champion for the current season."
        action={<Badge tone="warn">Demonstration Prediction — Real simulation coming in the ML phase</Badge>}
      />

      <Card glow className="flex flex-col items-center gap-4 py-10 text-center">
        <Trophy className="h-10 w-10 text-gold" strokeWidth={1.3} />
        <p className="text-xs uppercase tracking-wide text-slate-500">Most Likely Winner</p>
        <h2 className="font-display text-3xl text-white">{leaderTeam?.name}</h2>
        <p className="font-display text-2xl text-gold-light">{leader.probability}% Chance</p>
      </Card>

      <Card className="flex flex-col gap-4">
        <h3 className="font-display text-lg text-white">Championship Probability — All Teams</h3>
        <p className="text-xs text-slate-500">Probabilities sum to {Math.round(totalCheck)}% across the league.</p>
        <div className="flex flex-col gap-3">
          {sorted.map((o) => {
            const team = getTeamById(o.teamId);
            return (
              <div key={o.teamId} className="flex items-center gap-3">
                <span className="w-40 shrink-0 text-sm font-medium text-white truncate">{team?.name}</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: team?.primaryColor }}
                    initial={{ width: 0 }}
                    animate={{ width: `${o.probability}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <span className="w-14 shrink-0 text-right text-sm font-semibold text-gold-light">{o.probability}%</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default TournamentWinnerPrediction;
