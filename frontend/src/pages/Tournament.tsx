import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../components/common/SectionHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import LoadingScreen from '../components/common/LoadingScreen';
import { getTeamById } from '../data/teams';
import { getPointsTable } from '../services/predictionService';
import { PointsTableRow } from '../types/prediction';

const Tournament: React.FC = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<PointsTableRow[] | null>(null);

  useEffect(() => {
    getPointsTable().then(setRows);
  }, []);

  if (!rows) return <LoadingScreen label="Compiling points table…" />;

  const chartData = rows.map((r) => ({
    team: getTeamById(r.teamId)?.shortName ?? r.teamId,
    Playoff: r.playoffProbability,
  }));

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="IPL Tournament Intelligence"
        description="Live-style standings and playoff probability, projected from mock season data."
        action={<Button variant="outline" size="sm" onClick={() => navigate('/tournament-winner')}>Winner Prediction</Button>}
      />

      <Card padded={false} className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b hairline text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-5 py-3">#</th>
              <th className="px-5 py-3">Team</th>
              <th className="px-5 py-3 text-center">M</th>
              <th className="px-5 py-3 text-center">W</th>
              <th className="px-5 py-3 text-center">L</th>
              <th className="px-5 py-3 text-center">NRR</th>
              <th className="px-5 py-3 text-center">Pts</th>
              <th className="px-5 py-3 text-right">Playoff %</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => {
              const team = getTeamById(r.teamId);
              return (
                <tr key={r.teamId} className={`border-b hairline last:border-0 ${idx < 4 ? 'bg-emerald/[0.03]' : ''}`}>
                  <td className="px-5 py-3 text-slate-400">{idx + 1}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${team?.primaryColor}, #0D1224)` }}>
                        {team?.logoInitials}
                      </span>
                      <span className="font-medium text-white">{team?.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-center text-slate-300">{r.played}</td>
                  <td className="px-5 py-3 text-center text-slate-300">{r.won}</td>
                  <td className="px-5 py-3 text-center text-slate-300">{r.lost}</td>
                  <td className="px-5 py-3 text-center text-slate-300">{r.nrr > 0 ? `+${r.nrr.toFixed(2)}` : r.nrr.toFixed(2)}</td>
                  <td className="px-5 py-3 text-center font-semibold text-white">{r.points}</td>
                  <td className="px-5 py-3 text-right font-medium text-gold-light">{r.playoffProbability}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      <Card className="flex flex-col gap-4">
        <h3 className="font-display text-lg text-white">Playoff Probability by Team</h3>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="team" tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#111421', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="Playoff" fill="#C9A24B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default Tournament;
