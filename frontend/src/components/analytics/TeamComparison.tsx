import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { TeamStrength, Team } from '../../types/team';

interface TeamComparisonProps {
  teamA: Team;
  teamB: Team;
  strengthA: TeamStrength;
  strengthB: TeamStrength;
}

const rows: { key: keyof TeamStrength; label: string }[] = [
  { key: 'batting', label: 'Batting' },
  { key: 'bowling', label: 'Bowling' },
  { key: 'recentForm', label: 'Recent Form' },
  { key: 'venueRecord', label: 'Venue Record' },
  { key: 'playingXIStrength', label: 'Playing XI Strength' },
];

const TeamComparison: React.FC<TeamComparisonProps> = ({ teamA, teamB, strengthA, strengthB }) => {
  const chartData = rows.map((r) => ({
    metric: r.label,
    [teamA.shortName]: strengthA[r.key],
    [teamB.shortName]: strengthB[r.key],
  }));

  const overallA = Math.round(rows.reduce((sum, r) => sum + strengthA[r.key], 0) / rows.length * 10) / 10;
  const overallB = Math.round(rows.reduce((sum, r) => sum + strengthB[r.key], 0) / rows.length * 10) / 10;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2 flex flex-col gap-3">
        <div className="flex justify-between text-xs text-slate-500 pb-1">
          <span>Metric</span>
          <span>{teamA.shortName} vs {teamB.shortName}</span>
        </div>
        {rows.map((r) => (
          <div key={r.key}>
            <div className="mb-1 flex justify-between text-xs text-slate-400">
              <span style={{ color: teamA.primaryColor }}>{strengthA[r.key]}</span>
              <span>{r.label}</span>
              <span style={{ color: teamB.primaryColor }}>{strengthB[r.key]}</span>
            </div>
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-white/5">
              <div className="h-full" style={{ width: `${strengthA[r.key] / 2}%`, backgroundColor: teamA.primaryColor, marginLeft: 'auto' }} />
              <div className="h-full" style={{ width: `${strengthB[r.key] / 2}%`, backgroundColor: teamB.primaryColor }} />
            </div>
          </div>
        ))}
        <div className="mt-2 flex items-center justify-center gap-6 rounded-xl border border-white/8 py-3">
          <div className="text-center">
            <p className="text-xs text-slate-500">{teamA.shortName}</p>
            <p className="font-display text-2xl" style={{ color: teamA.primaryColor }}>{overallA}</p>
          </div>
          <span className="text-slate-600 text-sm">vs</span>
          <div className="text-center">
            <p className="text-xs text-slate-500">{teamB.shortName}</p>
            <p className="font-display text-2xl" style={{ color: teamB.primaryColor }}>{overallB}</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData} outerRadius="75%">
            <PolarGrid stroke="rgba(255,255,255,0.08)" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: '#94A3B8', fontSize: 11 }} />
            <Radar name={teamA.shortName} dataKey={teamA.shortName} stroke={teamA.primaryColor} fill={teamA.primaryColor} fillOpacity={0.25} />
            <Radar name={teamB.shortName} dataKey={teamB.shortName} stroke={teamB.primaryColor} fill={teamB.primaryColor} fillOpacity={0.25} />
            <Legend wrapperStyle={{ fontSize: 12, color: '#94A3B8' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TeamComparison;
