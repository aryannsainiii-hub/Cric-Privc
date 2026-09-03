import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SectionHeader from '../components/common/SectionHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { getTeamById } from '../data/teams';
import { useMatch } from '../context/MatchContext';

const timeline = Array.from({ length: 15 }, (_, i) => {
  const over = i + 1;
  const wobble = Math.sin(over / 2) * 8;
  return { over, teamAWinProb: Math.max(10, Math.min(90, Math.round(50 + over * 1.6 + wobble))) };
});

const LiveMatchPrediction: React.FC = () => {
  const { config } = useMatch();
  const teamA = getTeamById(config.teamAId);
  const teamB = getTeamById(config.teamBId);
  const latest = timeline[timeline.length - 1].teamAWinProb;

  const demo = useMemo(
    () => ({ score: 138, wickets: 4, overs: 15.2, crr: 9.02, rrr: 8.16 }),
    []
  );

  if (!teamA || !teamB) return null;

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="Live Match Prediction"
        description="A demonstration of the live win-probability experience."
        action={<Badge tone="warn">Demonstration Data — Not a Live Feed</Badge>}
      />

      <Card className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        {[
          { label: 'Score', value: `${demo.score}/${demo.wickets}` },
          { label: 'Overs', value: demo.overs },
          { label: 'Wickets', value: demo.wickets },
          { label: 'Current RR', value: demo.crr },
          { label: 'Required RR', value: demo.rrr },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-white/8 p-3 text-center">
            <p className="text-xs text-slate-500">{s.label}</p>
            <p className="font-display text-xl text-white">{s.value}</p>
          </div>
        ))}
      </Card>

      <Card className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg text-white">Live Win Probability Timeline</h3>
          <p className="text-sm">
            <span style={{ color: teamA.primaryColor }} className="font-semibold">{teamA.shortName} {latest}%</span>
            <span className="text-slate-500"> · </span>
            <span style={{ color: teamB.primaryColor }} className="font-semibold">{teamB.shortName} {100 - latest}%</span>
          </p>
        </div>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timeline} margin={{ left: -20 }}>
              <defs>
                <linearGradient id="probFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={teamA.primaryColor} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={teamA.primaryColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="over" tick={{ fill: '#94A3B8', fontSize: 11 }} label={{ value: 'Overs', position: 'insideBottom', offset: -4, fill: '#64748B', fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#111421', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="teamAWinProb" name={`${teamA.shortName} Win %`} stroke={teamA.primaryColor} fill="url(#probFill)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default LiveMatchPrediction;
