import React from 'react';
import { motion } from 'framer-motion';
import { TossScenario } from '../../types/prediction';
import Card from '../common/Card';

const TossSimulator: React.FC<{ scenarios: TossScenario[] }> = ({ scenarios }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    {scenarios.map((s, idx) => (
      <Card key={s.label} className="flex flex-col gap-3">
        <p className="text-sm font-medium text-white">{s.label}</p>
        <p className="text-xs text-slate-400">{s.description}</p>
        <div className="mt-1 flex items-end justify-between">
          <span className="font-display text-3xl font-medium text-gold-light">{s.winProbability}%</span>
          <span className="text-xs text-slate-500">Win Probability</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-royal to-gold"
            initial={{ width: 0 }}
            animate={{ width: `${s.winProbability}%` }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
          />
        </div>
      </Card>
    ))}
  </div>
);

export default TossSimulator;
