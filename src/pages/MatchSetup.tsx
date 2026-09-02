import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import TeamSelector from '../components/match/TeamSelector';
import { venues } from '../data/venues';
import { useMatch } from '../context/MatchContext';

const MatchSetup: React.FC = () => {
  const navigate = useNavigate();
  const { config, setConfig } = useMatch();
  const [error, setError] = useState<string | null>(null);

  const handleContinue = () => {
    if (config.teamAId === config.teamBId) {
      setError('Team A and Team B must be different franchises.');
      return;
    }
    setError(null);
    navigate('/playing-xi');
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <SectionHeader title="Match Setup" description="Configure the fixture Cric Privé will analyze." />
      <Card className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TeamSelector label="Team A" value={config.teamAId} onChange={(v) => setConfig({ teamAId: v })} disabledTeamId={config.teamBId} />
          <TeamSelector label="Team B" value={config.teamBId} onChange={(v) => setConfig({ teamBId: v })} disabledTeamId={config.teamAId} />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">Venue</label>
          <select
            value={config.venueId}
            onChange={(e) => setConfig({ venueId: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-obsidian-800 px-3.5 py-2.5 text-sm text-white outline-none focus:border-gold/50"
          >
            {venues.map((v) => (
              <option key={v.id} value={v.id}>{v.name}, {v.city}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">Match Date</label>
            <input
              type="date"
              value={config.date}
              onChange={(e) => setConfig({ date: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-obsidian-800 px-3.5 py-2.5 text-sm text-white outline-none focus:border-gold/50"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">Match Time</label>
            <input
              type="time"
              value={config.time}
              onChange={(e) => setConfig({ time: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-obsidian-800 px-3.5 py-2.5 text-sm text-white outline-none focus:border-gold/50"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">Day / Night</label>
          <div className="flex gap-2">
            {(['Day', 'Night', 'Day/Night'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setConfig({ dayNight: opt })}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  config.dayNight === opt ? 'border-gold/50 bg-gold/10 text-gold-light' : 'border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-warn/30 bg-warn/10 px-3.5 py-2.5 text-sm text-warn">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        <Button onClick={handleContinue} className="w-full sm:w-fit">Continue to Playing XI</Button>
      </Card>
    </div>
  );
};

export default MatchSetup;
