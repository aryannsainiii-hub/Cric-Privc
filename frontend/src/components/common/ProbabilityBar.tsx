import React from 'react';
import { motion } from 'framer-motion';

interface ProbabilityBarProps {
  leftLabel: string;
  rightLabel: string;
  leftValue: number;
  rightValue: number;
  leftColor?: string;
  rightColor?: string;
}

const ProbabilityBar: React.FC<ProbabilityBarProps> = ({
  leftLabel,
  rightLabel,
  leftValue,
  rightValue,
  leftColor = '#3EA6FF',
  rightColor = '#C9A24B',
}) => (
  <div>
    <div className="mb-2 flex items-center justify-between text-sm">
      <span className="font-medium text-slate-200">{leftLabel} <span style={{ color: leftColor }}>{leftValue}%</span></span>
      <span className="font-medium text-slate-200"><span style={{ color: rightColor }}>{rightValue}%</span> {rightLabel}</span>
    </div>
    <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-white/5">
      <motion.div
        className="h-full"
        style={{ backgroundColor: leftColor }}
        initial={{ width: 0 }}
        animate={{ width: `${leftValue}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      <motion.div
        className="h-full"
        style={{ backgroundColor: rightColor }}
        initial={{ width: 0 }}
        animate={{ width: `${rightValue}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  </div>
);

export default ProbabilityBar;
