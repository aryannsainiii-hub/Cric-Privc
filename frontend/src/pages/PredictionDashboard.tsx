import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Moon, Sun } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import WinProbability from '../components/prediction/WinProbability';
import ConfidenceScore from '../components/prediction/ConfidenceScore';
import PredictionInsights from '../components/prediction/PredictionInsights';
import TeamComparison from '../components/analytics/TeamComparison';
import LoadingScreen from '../components/common/LoadingScreen';
import { getTeamById } from '../data/teams';
import { getVenueById } from '../data/venues';
import { getPlayersByTeam } from '../data/players';
import { getPrediction } from '../services/predictionService';
import { MatchPrediction } from '../types/prediction';
import { useMatch } from '../context/MatchContext';

const PredictionDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { config, playingXIA, playingXIB } = useMatch();
  const [prediction, setPrediction] = useState<MatchPrediction | null>(null);

  const teamA = getTeamById(config.teamAId);
  const teamB = getTeamById(config.teamBId);
  const venue = getVenueById(config.venueId);

  useEffect(() => {
    getPrediction('current', config.teamAId, config.teamBId, config.venueId).then(setPrediction);
  }, [config.teamAId, config.teamBId, config.venueId]);

  const keyPlayersA = getPlayersByTeam(config.teamAId)
    .filter((p) => playingXIA.length === 0 || playingXIA.includes(p.id))
    .sort((a, b) => b.impactScore - a.impactScore)
    .slice(0, 3);
  const keyPlayersB = getPlayersByTeam(config.teamBId)
    .filter((p) => playingXIB.length === 0 || playingXIB.includes(p.id))
    .sort((a, b) => b.impactScore - a.impactScore)
    .slice(0, 3);

  if (!teamA || !teamB || !venue || !prediction) return <LoadingScreen label="Compiling prediction dashboard…" />;

  return (
    <div className="flex flex-col gap-6">
      <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Selected Match</p>
          <h1 className="font-display text-2xl text-white">{teamA.name} <span className="text-slate-500">vs</span> {teamB.name}</h1>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {venue.name}</span>
          <Badge tone="royal">
            {config.dayNight === 'Night' ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />} {config.dayNight} Match
          </Badge>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card glow className="lg:col-span-2 flex flex-col gap-6">
          <SectionHeader title="Main Prediction" />
          <WinProbability teamA={teamA} teamB={teamB} probA={prediction.winProbability.teamAProbability} probB={prediction.winProbability.teamBProbability} />
        </Card>
        <Card className="flex items-center justify-center">
          <ConfidenceScore score={prediction.winProbability.aiConfidence} />
        </Card>
      </div>

      <Card className="flex flex-col gap-4">
        <SectionHeader title="Key Insights" />
        <PredictionInsights insights={prediction.insights} />
      </Card>

      <Card className="flex flex-col gap-4">
        <SectionHeader title="Team Strength Comparison" />
        <TeamComparison teamA={teamA} teamB={teamB} strengthA={prediction.teamAStrength} strengthB={prediction.teamBStrength} />
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[{ team: teamA, players: keyPlayersA }, { team: teamB, players: keyPlayersB }].map(({ team, players }) => (
          <Card key={team.id} className="flex flex-col gap-4">
            <SectionHeader title={`Key Players — ${team.shortName}`} />
            <div className="flex flex-col gap-3">
              {players.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border border-white/8 px-3.5 py-2.5">
                  <div>
                    <p className="text-sm font-medium text-white">{p.name}</p>
                    <p className="text-xs text-slate-500">{p.role}</p>
                  </div>
                  <div className="flex gap-4 text-right text-xs">
                    <div>
                      <p className="text-slate-500">Form</p>
                      <p className="font-medium text-white">{p.formScore}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Impact</p>
                      <p className="font-medium text-gold-light">{p.impactScore}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="outline" size="sm" onClick={() => navigate('/pitch-intelligence')}>Pitch Intelligence</Button>
        <Button variant="outline" size="sm" onClick={() => navigate('/weather-intelligence')}>Weather Intelligence</Button>
        <Button variant="outline" size="sm" onClick={() => navigate('/player-battles')}>Player Battles</Button>
        <Button variant="outline" size="sm" onClick={() => navigate('/toss-impact')}>Toss Scenarios</Button>
        <Button variant="outline" size="sm" onClick={() => navigate('/what-if-simulator')}>What-If Simulator</Button>
      </div>
    </div>
  );
};

export default PredictionDashboard;
