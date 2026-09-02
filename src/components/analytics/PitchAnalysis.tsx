import React from 'react';
import { Venue } from '../../types/match';
import Card from '../common/Card';
import Badge from '../common/Badge';

const Meter: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div>
    <div className="mb-1 flex justify-between text-xs text-slate-400">
      <span>{label}</span>
      <span className="text-slate-200">{value}%</span>
    </div>
    <div className="h-1.5 w-full rounded-full bg-white/5">
      <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
  </div>
);
//work over pithes and their behaviour

const PitchAnalysis: React.FC<{ venue: Venue }> = ({ venue }) => (
  <Card className="flex flex-col gap-5">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="font-display text-xl text-white">{venue.name}</h3>
        <p className="text-sm text-slate-400">{venue.city}</p>
      </div>
      <Badge tone="gold">{venue.pitchType}</Badge>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-xl border border-white/8 p-3">
        <p className="text-xs text-slate-500">Avg 1st Innings Score</p>
        <p className="font-display text-2xl text-white">{venue.avgFirstInningsScore}</p>
      </div>
      <div className="rounded-xl border border-white/8 p-3">
        <p className="text-xs text-slate-500">Avg 2nd Innings Score</p>
        <p className="font-display text-2xl text-white">{venue.avgSecondInningsScore}</p>
      </div>
    </div>

    <div className="flex flex-col gap-3.5">
      <Meter label="Batting Friendliness" value={venue.battingFriendliness} color="#C9A24B" />
      <Meter label="Pace Assistance" value={venue.paceAssistance} color="#3EA6FF" />
      <Meter label="Spin Assistance" value={venue.spinAssistance} color="#6B4EFF" />
      <Meter label="Chasing Advantage" value={venue.chasingAdvantage} color="#34C77B" />
    </div>

    <div className="grid grid-cols-3 gap-3 text-center text-xs">
      <div className="rounded-lg bg-white/[0.03] py-2.5">
        <p className="text-slate-500">Surface</p>
        <p className="mt-0.5 font-medium text-white">{venue.surface}</p>
      </div>
      <div className="rounded-lg bg-white/[0.03] py-2.5">
        <p className="text-slate-500">Pace Bounce</p>
        <p className="mt-0.5 font-medium text-white">{venue.paceBounce}</p>
      </div>
      <div className="rounded-lg bg-white/[0.03] py-2.5">
        <p className="text-slate-500">Spin Turn</p>
        <p className="mt-0.5 font-medium text-white">{venue.spinTurn}</p>
      </div>
    </div>
  </Card>
);

export default PitchAnalysis;
