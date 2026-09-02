import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC<{ label?: string }> = ({ label = 'Loading intelligence…' }) => (
  <div className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-4 text-slate-400">
    <motion.div
      className="h-10 w-10 rounded-full border-2 border-gold/30 border-t-gold"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
    />
    <p className="text-sm tracking-wide">{label}</p>
  </div>
);

export default LoadingScreen;
