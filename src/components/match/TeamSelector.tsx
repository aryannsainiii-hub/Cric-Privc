import React from 'react';
import { teams } from '../../data/teams';

interface TeamSelectorProps {
  label: string;
  value: string;
  onChange: (teamId: string) => void;
  disabledTeamId?: string;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({ label, value, onChange, disabledTeamId }) => (
  <div>
    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-white/10 bg-obsidian-800 px-3.5 py-2.5 text-sm text-white outline-none focus:border-gold/50"
    >
      {teams.map((t) => (
        <option key={t.id} value={t.id} disabled={t.id === disabledTeamId}>
          {t.name}
        </option>
      ))}
    </select>
  </div>
);

export default TeamSelector;
