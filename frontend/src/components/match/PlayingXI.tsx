import React from 'react';
import { Check, User } from 'lucide-react';
import { Player } from '../../types/player';
import { Team } from '../../types/team';

interface PlayingXIProps {
  team: Team;
  players: Player[];
  selected: string[];
  onToggle: (playerId: string) => void;
}

const PlayingXIList: React.FC<PlayingXIProps> = ({ team, players, selected, onToggle }) => (
  <div>
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${team.primaryColor}, #0D1224)` }}
        >
          {team.logoInitials}
        </span>
        <h3 className="font-display text-lg text-white">{team.name}</h3>
      </div>
      <span className={`text-xs font-semibold ${selected.length === 11 ? 'text-emerald' : 'text-slate-400'}`}>
        Selected: {selected.length}/11
      </span>
    </div>
    <div className="flex flex-col gap-1.5 max-h-[520px] overflow-y-auto pr-1">
      {players.map((p) => {
        const isSelected = selected.includes(p.id);
        const disableAdd = !isSelected && selected.length >= 11;
        return (
          <button
            key={p.id}
            disabled={disableAdd}
            onClick={() => onToggle(p.id)}
            className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-left transition-colors ${
              isSelected ? 'border-gold/40 bg-gold/5' : 'border-white/8 bg-white/[0.02] hover:bg-white/5'
            } ${disableAdd ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-slate-400">
                <User className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-sm font-medium text-white">
                  {p.name} {p.isCaptain && <span className="text-gold">(c)</span>} {p.isWicketkeeper && <span className="text-electric">(wk)</span>}
                </p>
                <p className="text-xs text-slate-500">{p.role} · Form {p.formScore}</p>
              </div>
            </div>
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                isSelected ? 'border-gold bg-gold text-obsidian-950' : 'border-white/20'
              }`}
            >
              {isSelected && <Check className="h-3 w-3" />}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

export default PlayingXIList;
