import React from 'react';
import { PlayerBattleStat } from '../../types/prediction';
import { getPlayerById } from '../../data/players';
import Card from '../common/Card';

const PlayerBattle: React.FC<{ battle: PlayerBattleStat }> = ({ battle }) => {
  const batter = getPlayerById(battle.batterId);
  const bowler = getPlayerById(battle.bowlerId);
  //player battle is a comparison between a batter and a bowler based on their performance against each other. It includes stats like runs scored, balls faced, dismissals, strike rate, and advantage percentages for both players.

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-center flex-1">
          <p className="text-sm font-semibold text-white">{batter?.name}</p>
          <p className="text-xs text-slate-500">Batter</p>
        </div>
        <span className="px-3 text-xs font-semibold text-slate-500">VS</span>
        <div className="text-center flex-1">
          <p className="text-sm font-semibold text-white">{bowler?.name}</p>
          <p className="text-xs text-slate-500">Bowler</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <div>
          <p className="text-slate-500">Runs</p>
          <p className="font-medium text-white">{battle.runsScored}</p>
        </div>
        <div>
          <p className="text-slate-500">Balls</p>
          <p className="font-medium text-white">{battle.ballsFaced}</p>
        </div>
        <div>
          <p className="text-slate-500">Dismissals</p>
          <p className="font-medium text-white">{battle.dismissals}</p>
        </div>
        <div>
          <p className="text-slate-500">Strike Rate</p>
          <p className="font-medium text-white">{battle.strikeRate}</p>
        </div>
      </div>

      <div>
        <div className="mb-1 flex justify-between text-xs text-slate-400">
          <span>Batter Advantage {battle.batterAdvantage}%</span>
          <span>Bowler Advantage {100 - battle.batterAdvantage}%</span>
        </div>
        <div className="flex h-2 w-full overflow-hidden rounded-full bg-white/5">
          <div className="h-full bg-emerald" style={{ width: `${battle.batterAdvantage}%` }} />
          <div className="h-full bg-warn" style={{ width: `${100 - battle.batterAdvantage}%` }} />
        </div>
      </div>
    </Card>
  );
};

export default PlayerBattle;
