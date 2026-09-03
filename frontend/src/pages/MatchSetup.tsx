import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Wifi, WifiOff } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import LoadingScreen from '../components/common/LoadingScreen';
import ErrorState from '../components/common/ErrorState';
import TeamSelector from '../components/match/TeamSelector';
import { getTeams } from '../services/teamService';
import { getVenues, VenueSummary } from '../services/venueService';
import { createMatch } from '../services/matchService';
import { useMatch } from '../context/MatchContext';
import { Team } from '../types/team';

const MatchSetup: React.FC = () => {
  const navigate = useNavigate();
  const { config, setConfig, matchId, setMatchId } = useMatch();
  const [error, setError] = useState<string | null>(null);

  const [teams, setTeams] = useState<Team[] | null>(null);
  const [venues, setVenues] = useState<VenueSummary[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [backendConnected, setBackendConnected] = useState<boolean | null>(null);
  const [creatingMatch, setCreatingMatch] = useState(false);
  const [matchSaveWarning, setMatchSaveWarning] = useState<string | null>(null);

  const loadReferenceData = () => {
    setLoadError(null);
    setTeams(null);
    setVenues(null);
    Promise.all([getTeams(), getVenues()])
      .then(([fetchedTeams, fetchedVenues]) => {
        setTeams(fetchedTeams);
        setVenues(fetchedVenues);
        setBackendConnected(true);
        // If the currently-selected team/venue no longer exist in the
        // fetched lists, fall back to the first available option so the
        // dropdowns never show a stale local id.
        if (fetchedTeams.length && !fetchedTeams.some((t) => t.id === config.teamAId)) {
          setConfig({ teamAId: fetchedTeams[0].id });
        }
        if (fetchedVenues.length && !fetchedVenues.some((v) => v.id === config.venueId)) {
          setConfig({ venueId: fetchedVenues[0].id });
        }
      })
      .catch((err) => {
        setBackendConnected(false);
        setLoadError(
          err instanceof Error
            ? err.message
            : 'Unable to load teams and venues from the backend.'
        );
      });
  };

  useEffect(() => {
    loadReferenceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContinue = async () => {
    if (config.teamAId === config.teamBId) {
      setError('Team A and Team B must be different franchises.');
      return;
    }
    setError(null);
    setMatchSaveWarning(null);

    if (backendConnected) {
      setCreatingMatch(true);
      try {
        const match = await createMatch({
          teamAId: config.teamAId,
          teamBId: config.teamBId,
          venueId: config.venueId,
          date: config.date,
          time: config.time,
          dayNight: config.dayNight,
        });
        setMatchId(match.id);
      } catch (err) {
        // Non-blocking: Playing XI selection still works locally even
        // if the backend couldn't persist this match configuration.
        setMatchId(null);
        setMatchSaveWarning(
          err instanceof Error
            ? `Backend couldn't save this match configuration (${err.message}). Continuing with a local-only session.`
            : "Backend couldn't save this match configuration. Continuing with a local-only session."
        );
      } finally {
        setCreatingMatch(false);
      }
    }

    navigate('/playing-xi');
  };

  if (loadError && !teams && !venues) {
    return (
      <div className="flex flex-col gap-6 max-w-3xl">
        <SectionHeader title="Match Setup" description="Configure the fixture Cric Privé will analyze." />
        <ErrorState message={loadError} onRetry={loadReferenceData} />
      </div>
    );
  }

  if (!teams || !venues) {
    return (
      <div className="flex flex-col gap-6 max-w-3xl">
        <SectionHeader title="Match Setup" description="Configure the fixture Cric Privé will analyze." />
        <LoadingScreen label="Loading teams and venues from the backend…" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <SectionHeader
        title="Match Setup"
        description="Configure the fixture Cric Privé will analyze."
        action={
          backendConnected ? (
            <Badge tone="emerald"><Wifi className="h-3 w-3" /> Backend connected</Badge>
          ) : (
            <Badge tone="warn"><WifiOff className="h-3 w-3" /> Backend unavailable</Badge>
          )
        }
      />
      <Card className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TeamSelector label="Team A" value={config.teamAId} onChange={(v) => setConfig({ teamAId: v })} teams={teams} disabledTeamId={config.teamBId} />
          <TeamSelector label="Team B" value={config.teamBId} onChange={(v) => setConfig({ teamBId: v })} teams={teams} disabledTeamId={config.teamAId} />
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

        {matchSaveWarning && (
          <div className="flex items-center gap-2 rounded-lg border border-gold/30 bg-gold/5 px-3.5 py-2.5 text-sm text-gold-light">
            <AlertCircle className="h-4 w-4 shrink-0" /> {matchSaveWarning}
          </div>
        )}

        <Button onClick={handleContinue} disabled={creatingMatch} className="w-full sm:w-fit">
          {creatingMatch ? 'Saving match…' : 'Continue to Playing XI'}
        </Button>
      </Card>
    </div>
  );
};

export default MatchSetup;
