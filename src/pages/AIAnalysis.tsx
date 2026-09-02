import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';
import { useMatch } from '../context/MatchContext';

const steps = [
  'Loading IPL historical records',
  'Evaluating recent team form',
  'Analyzing selected Playing XI',
  'Processing venue characteristics',
  'Evaluating pitch behaviour',
  'Analyzing weather conditions',
  'Running predictive models',
  'Generating Cric Privé intelligence report',
];

const STEP_INTERVAL_MS = 600; // ~4.8s total for 8 steps

const AIAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const { setAnalysisComplete } = useMatch();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (activeStep >= steps.length) {
      setAnalysisComplete(true);
      const timeout = setTimeout(() => navigate('/prediction-dashboard'), 600);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => setActiveStep((s) => s + 1), STEP_INTERVAL_MS);
    return () => clearTimeout(timeout);
  }, [activeStep, navigate, setAnalysisComplete]);

  const progress = Math.min(100, Math.round((activeStep / steps.length) * 100));

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-10 text-center">
      <div className="relative flex h-40 w-40 items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full border border-gold/20"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.15, 0.6] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border border-royal/30"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
        />
        <motion.div
          className="h-16 w-16 rounded-full bg-gradient-to-br from-gold to-royal shadow-glow"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        />
      </div>

      <div>
        <h1 className="font-display text-2xl md:text-3xl font-medium text-white">Cric Privé AI is analyzing your match</h1>
        <p className="mt-2 text-sm text-slate-400">This is a Phase 1 frontend demonstration — no live model is running yet.</p>
      </div>

      <div className="w-full max-w-md">
        <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-royal via-electric to-gold"
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.4 }}
          />
        </div>
        <div className="flex flex-col gap-2.5 text-left">
          <AnimatePresence>
            {steps.map((step, idx) => {
              const done = idx < activeStep;
              const current = idx === activeStep;
              if (idx > activeStep) return null;
              return (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2.5 text-sm"
                >
                  {done ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald" />
                  ) : (
                    <Circle className={`h-4 w-4 shrink-0 ${current ? 'text-gold animate-pulse' : 'text-slate-600'}`} />
                  )}
                  <span className={done ? 'text-slate-300' : 'text-white'}>{step}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;
