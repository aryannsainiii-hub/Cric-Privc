import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/common/SectionHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { getTeamById } from '../data/teams';
import { computeWinProbability } from '../data/predictions';
import { useMatch } from '../context/MatchContext';

type PitchType = 'Batting-friendly' | 'Balanced' | 'Bowling-friendly';
type DewIntensity = 'Low' | 'Medium' | 'High';
type WeatherCondition = 'Clear' | 'Overcast' | 'Light Rain';

const WhatIfSimulator: React.FC = () => {
  const { config } = useMatch();
  const teamA = getTeamById(config.teamAId);
  const teamB = getTeamById(config.teamBId);

  const [battingFirst, setBattingFirst] = useState<'teamA' | 'teamB'>('teamA');
  const [pitchType, setPitchType] = useState<PitchType>('Balanced');
  const [dew, setDew] = useState<DewIntensity>('Medium');
  const [weather, setWeather] = useState<WeatherCondition>('Clear');
  const [keyPlayerAvailable, setKeyPlayerAvailable] = useState(true);

  const base = useMemo(() => computeWinProbability(config.teamAId, config.teamBId, config.venueId), [config]);

  const adjustedProbA = useMemo(() => {
    let prob = base.teamAProbability;
    if (battingFirst === 'teamA') prob += pitchType === 'Batting-friendly' ? 3 : pitchType === 'Bowling-friendly' ? -3 : 0;
    else prob -= pitchType === 'Batting-friendly' ? 3 : pitchType === 'Bowling-friendly' ? -3 : 0;

    if (dew === 'High') prob += battingFirst === 'teamA' ? -4 : 4;
    if (dew === 'Low') prob += battingFirst === 'teamA' ? 2 : -2;

    if (weather === 'Light Rain') prob -= 2;
    if (weather === 'Overcast') prob += 1;

    if (!keyPlayerAvailable) prob -= 6;

    return Math.min(94, Math.max(6, Math.round(prob)));
  }, [base, battingFirst, pitchType, dew, weather, keyPlayerAvailable]);

  const adjustedProbB = 100 - adjustedProbA;

  if (!teamA || !teamB) return null;

  const OptionGroup = <T extends string>({ label, options, value, onChange }: { label: string; options: T[]; value: T; onChange: (v: T) => void }) => (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
              value === opt ? 'border-royal/50 bg-royal/10 text-white' : 'border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader title="What-If Simulator" description="Adjust match conditions and watch the prediction respond." action={<Badge tone="royal">Scenario Simulation</Badge>} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 flex flex-col gap-6">
          <OptionGroup label="Batting First" options={['teamA', 'teamB'] as const} value={battingFirst} onChange={setBattingFirst} />
          <OptionGroup label="Pitch Type" options={['Batting-friendly', 'Balanced', 'Bowling-friendly'] as const} value={pitchType} onChange={setPitchType} />
          <OptionGroup label="Dew Intensity" options={['Low', 'Medium', 'High'] as const} value={dew} onChange={setDew} />
          <OptionGroup label="Weather Condition" options={['Clear', 'Overcast', 'Light Rain'] as const} value={weather} onChange={setWeather} />
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">Key Player Availability</p>
            <button
              onClick={() => setKeyPlayerAvailable((v) => !v)}
              className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
                keyPlayerAvailable ? 'border-emerald/40 bg-emerald/10 text-emerald' : 'border-warn/40 bg-warn/10 text-warn'
              }`}
            >
              {keyPlayerAvailable ? 'Star player available' : 'Star player ruled out'}
            </button>
          </div>
        </Card>

        <Card className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Updated Win Probability</p>
          <div className="flex w-full items-center justify-between px-2">
            <div>
              <p className="text-sm text-slate-400">{teamA.shortName}</p>
              <p className="font-display text-4xl" style={{ color: teamA.primaryColor }}>{adjustedProbA}%</p>
            </div>
            <span className="text-slate-600">vs</span>
            <div>
              <p className="text-sm text-slate-400">{teamB.shortName}</p>
              <p className="font-display text-4xl" style={{ color: teamB.primaryColor }}>{adjustedProbB}%</p>
            </div>
          </div>
          <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div className="h-full" style={{ backgroundColor: teamA.primaryColor }} animate={{ width: `${adjustedProbA}%` }} transition={{ duration: 0.5 }} />
            <motion.div className="h-full" style={{ backgroundColor: teamB.primaryColor }} animate={{ width: `${adjustedProbB}%` }} transition={{ duration: 0.5 }} />
          </div>
          <p className="text-[11px] text-slate-500">Recalculated instantly using mock scenario logic — ready to be swapped for a backend simulation call.</p>
        </Card>
      </div>
    </div>
  );
};

export default WhatIfSimulator;
