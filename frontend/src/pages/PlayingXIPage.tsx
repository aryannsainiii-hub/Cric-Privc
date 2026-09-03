import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import LoadingScreen from '../components/common/LoadingScreen';
import ErrorState from '../components/common/ErrorState';
import PlayingXIList from '../components/match/PlayingXI';
import { getTeamById } from '../services/teamService';
import { getPlayersByTeam } from '../services/playerService';
import { submitPlayingXI } from '../services/matchService';
import { useMatch } from '../context/MatchContext';
import { Team } from '../types/team';
import { Player } from '../types/player';

const PlayingXIPage: React.FC = () => {
  const navigate = useNavigate();
  const { config, matchId, playingXIA, playingXIB, setPlayingXIA, setPlayingXIB } = useMatch();

  const [teamA, setTeamA] = useState<Team | null>(null);
  const [teamB, setTeamB] = useState<Team | null>(null);
  const [playersA, setPlayersA] = useState<Player[]>([]);
  const [playersB, setPlayersB] = useState<Player[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadTeamsAndPlayers = () => {
    setLoading(true);
    setLoadError(null);
    Promise.all([
      getTeamById(config.teamAId),
      getTeamById(config.teamBId),
      getPlayersByTeam(config.teamAId),
      getPlayersByTeam(config.teamBId),
    ])
      .then(([a, b, pA, pB]) => {
        if (!a || !b) {
          setLoadError('One or both selected teams could not be found.');
          return;
        }
        setTeamA(a);
        setTeamB(b);
        setPlayersA(pA);
        setPlayersB(pB);
      })
      .catch((err) => {
        setLoadError(err instanceof Error ? err.message : 'Unable to load players from the backend.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTeamsAndPlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.teamAId, config.teamBId]);

  const toggle = (list: string[], setList: (ids: string[]) => void, id: string) => {
    if (list.includes(id)) {
      setList(list.filter((p) => p !== id));
    } else if (list.length < 11) {
      setList([...list, id]);
    }
  };

  const bothComplete = playingXIA.length === 11 && playingXIB.length === 11;

  const handleContinue = async () => {
    setSubmitError(null);

    // Persist to the backend only if MatchSetup managed to create a
    // match record. If it didn't (backend was down), we already
    // warned the user there and fall back to a purely local session,
    // exactly like Phase 1.
    if (matchId) {
      setSubmitting(true);
      try {
        await submitPlayingXI({
          matchId,
          teamAId: config.teamAId,
          teamAPlayerIds: playingXIA,
          teamBId: config.teamBId,
          teamBPlayerIds: playingXIB,
        });
      } catch (err) {
        setSubmitError(
          err instanceof Error
            ? `Backend rejected this Playing XI (${err.message}). You can still continue with your local selection.`
            : 'Backend rejected this Playing XI. You can still continue with your local selection.'
        );
        setSubmitting(false);
        return;
      }
      setSubmitting(false);
    }

    navigate('/ai-analysis');
  };

  if (loadError) {
    return (
      <div className="flex flex-col gap-6">
        <SectionHeader title="Playing XI Selection" description="Select and manage the Playing XI for both teams." />
        <ErrorState message={loadError} onRetry={loadTeamsAndPlayers} />
      </div>
    );
  }

  if (loading || !teamA || !teamB) {
    return (
      <div className="flex flex-col gap-6">
        <SectionHeader title="Playing XI Selection" description="Select and manage the Playing XI for both teams." />
        <LoadingScreen label="Loading squads from the backend…" />
      </div>
    );
  }

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

      {submitError && (
        <div className="flex items-center gap-2 rounded-lg border border-warn/30 bg-warn/10 px-3.5 py-2.5 text-sm text-warn">
          <AlertCircle className="h-4 w-4 shrink-0" /> {submitError}
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="ghost" onClick={() => navigate('/match-setup')}>Back</Button>
        <Button disabled={!bothComplete || submitting} onClick={handleContinue}>
          {submitting ? 'Saving Playing XI…' : 'Continue to AI Analysis'}
        </Button>
      </div>
    </div>
  );
};

export default PlayingXIPage;
