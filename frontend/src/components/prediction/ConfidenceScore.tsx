import React from 'react';
import { motion } from 'framer-motion';

const confidenceLabel = (score: number) => {
  if (score >= 80) return { label: 'High Confidence', tone: '#34C77B' };
  if (score >= 60) return { label: 'Moderate Confidence', tone: '#C9A24B' };
  return { label: 'Low Confidence', tone: '#E2604F' };
};

const ConfidenceScore: React.FC<{ score: number }> = ({ score }) => {
  const { label, tone } = confidenceLabel(score);
  const circumference = 2 * Math.PI * 46;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">AI Confidence</p>
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke={tone}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-3xl font-semibold text-white">{score}%</span>
        </div>
      </div>
      <span className="text-xs font-semibold" style={{ color: tone }}>{label}</span>
      <p className="max-w-[180px] text-center text-[11px] leading-snug text-slate-500">
        AI-based probability. Not a guaranteed match outcome.
      </p>
    </div>
  );
};

export default ConfidenceScore;
