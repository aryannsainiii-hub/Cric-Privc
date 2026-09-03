import React from 'react';

type Tone = 'gold' | 'royal' | 'electric' | 'emerald' | 'warn' | 'neutral';

const toneClasses: Record<Tone, string> = {
  gold: 'bg-gold/10 text-gold-light border-gold/30',
  royal: 'bg-royal/10 text-royal border-royal/30',
  electric: 'bg-electric/10 text-electric border-electric/30',
  emerald: 'bg-emerald/10 text-emerald border-emerald/30',
  warn: 'bg-warn/10 text-warn border-warn/30',
  neutral: 'bg-white/5 text-slate-300 border-white/10',
};

const Badge: React.FC<{ tone?: Tone; children: React.ReactNode; className?: string }> = ({
  tone = 'neutral',
  children,
  className = '',
}) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${toneClasses[tone]} ${className}`}>
    {children}
  </span>
);

export default Badge;
