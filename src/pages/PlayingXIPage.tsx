import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import PlayingXIList from '../components/match/PlayingXI';
import { getTeamById } from '../data/teams';
import { getPlayersByTeam } from '../data/players';
import { useMatch } from '../context/MatchContext';

const PlayingXIPage: React.FC = () => {
  const navigate = useNavigate();
  const { config, playingXIA, playingXIB, setPlayingXIA, setPlayingXIB } = useMatch();

  const teamA = getTeamById(config.teamAId);
  const teamB = getTeamById(config.teamBId);
  const playersA = getPlayersByTeam(config.teamAId);
  const playersB = getPlayersByTeam(config.teamBId);

  const toggle = (list: string[], setList: (ids: string[]) => void, id: string) => {
    if (list.includes(id)) {
      setList(list.filter((p) => p !== id));
    } else if (list.length < 11) {
      setList([...list, id]);
    }
  };

  const bothComplete = playingXIA.length === 11 && playingXIB.length === 11;

  if (!teamA || !teamB) return null;

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="Playing XI Selection"
        description="Select and manage the Playing XI for both teams."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <PlayingXIList team={teamA} players={playersA} selected={playingXIA} onToggle={(id) => toggle(playingXIA, setPlayingXIA, id)} />
        </Card>
        <Card>
          <PlayingXIList team={teamB} players={playersB} selected={playingXIB} onToggle={(id) => toggle(playingXIB, setPlayingXIB, id)} />
        </Card>
      </div>

      {!bothComplete && (
        <div className="flex items-center gap-2 rounded-lg border border-gold/30 bg-gold/5 px-3.5 py-2.5 text-sm text-gold-light">
          <AlertCircle className="h-4 w-4 shrink-0" /> Select exactly 11 players for each team to continue.
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="ghost" onClick={() => navigate('/match-setup')}>Back</Button>
        <Button disabled={!bothComplete} onClick={() => navigate('/ai-analysis')}>Continue to AI Analysis</Button>
      </div>
    </div>
  );
};

export default PlayingXIPage;
