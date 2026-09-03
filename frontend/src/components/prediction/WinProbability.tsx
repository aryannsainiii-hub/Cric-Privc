import React from 'react';
import { motion } from 'framer-motion';
import { Team } from '../../types/team';

interface WinProbabilityProps {
  teamA: Team;
  teamB: Team;
  probA: number;
  probB: number;
}

const WinProbability: React.FC<WinProbabilityProps> = ({ teamA, teamB, probA, probB }) => (
  <div className="flex flex-col gap-5">
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1 text-center">
        <p className="text-sm font-medium text-slate-300">{teamA.name}</p>
        <p className="font-display text-5xl font-semibold" style={{ color: teamA.primaryColor }}>{probA}%</p>
        <p className="text-xs uppercase tracking-wide text-slate-500">Win Probability</p>
      </div>
      <span className="text-slate-600 font-display text-lg">VS</span>
      <div className="flex-1 text-center">
        <p className="text-sm font-medium text-slate-300">{teamB.name}</p>
        <p className="font-display text-5xl font-semibold" style={{ color: teamB.primaryColor }}>{probB}%</p>
        <p className="text-xs uppercase tracking-wide text-slate-500">Win Probability</p>
      </div>
    </div>
    <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/5">
      <motion.div className="h-full" style={{ backgroundColor: teamA.primaryColor }} initial={{ width: 0 }} animate={{ width: `${probA}%` }} transition={{ duration: 1.1, ease: 'easeOut' }} />
      <motion.div className="h-full" style={{ backgroundColor: teamB.primaryColor }} initial={{ width: 0 }} animate={{ width: `${probB}%` }} transition={{ duration: 1.1, ease: 'easeOut' }} />
    </div>
  </div>
);

export default WinProbability;
