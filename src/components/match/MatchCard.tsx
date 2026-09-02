import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import { Match } from '../../types/match';
import { getTeamById } from '../../data/teams';
import { getVenueById } from '../../data/venues';
import Card from '../common/Card';
import Button from '../common/Button';
import { useMatch } from '../../context/MatchContext';

const TeamMark: React.FC<{ initials: string; color: string }> = ({ initials, color }) => (
  <div
    className="flex h-11 w-11 items-center justify-center rounded-full text-xs font-bold text-white shrink-0"
    style={{ background: `linear-gradient(135deg, ${color}, #0D1224)` }}
  >
    {initials}
  </div>
);

const MatchCard: React.FC<{ match: Match }> = ({ match }) => {
  const navigate = useNavigate();
  const { setConfig } = useMatch();
  const teamA = getTeamById(match.teamAId);
  const teamB = getTeamById(match.teamBId);
  const venue = getVenueById(match.venueId);

  const handleAnalyze = () => {
    setConfig({
      teamAId: match.teamAId,
      teamBId: match.teamBId,
      venueId: match.venueId,
      date: match.date,
      time: match.time,
      dayNight: match.dayNight,
    });
    navigate('/match-setup');
  };

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{new Date(match.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {match.time}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <TeamMark initials={teamA?.logoInitials ?? ''} color={teamA?.primaryColor ?? '#666'} />
          <span className="text-sm font-medium text-white">{teamA?.shortName}</span>
        </div>
        <span className="text-xs font-semibold text-slate-500">VS</span>
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-medium text-white">{teamB?.shortName}</span>
          <TeamMark initials={teamB?.logoInitials ?? ''} color={teamB?.primaryColor ?? '#666'} />
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <MapPin className="h-3 w-3" /> {venue?.name}, {venue?.city}
      </div>
      <Button size="sm" onClick={handleAnalyze} className="w-full">
        Analyze Match
      </Button>
    </Card>
  );
};

export default MatchCard;
