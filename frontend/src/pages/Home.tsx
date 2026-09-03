import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Radar, Trophy, MapPinned, BadgeCheck } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import SectionHeader from '../components/common/SectionHeader';
import AnimatedCounter from '../components/common/AnimatedCounter';
import ErrorState from '../components/common/ErrorState';
import LoadingScreen from '../components/common/LoadingScreen';
import MatchCard from '../components/match/MatchCard';
import WinProbability from '../components/prediction/WinProbability';
import ConfidenceScore from '../components/prediction/ConfidenceScore';
import { Match } from '../types/match';
import { Team } from '../types/team';
import { getUpcomingMatches, getFeaturedMatch } from '../services/matchService';
import { getPrediction } from '../services/predictionService';
import { getTeams } from '../services/teamService';
import { getVenues, VenueSummary } from '../services/venueService';
import { getTeamById } from '../data/teams';
import { MatchPrediction } from '../types/prediction';
import { useMatch } from '../context/MatchContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setConfig } = useMatch();

  // Upcoming matches — a required Phase 2 backend-connected feature.
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [venues, setVenues] = useState<VenueSummary[]>([]);
  const [matchesError, setMatchesError] = useState<string | null>(null);

  // Featured match intelligence — stays on mock data (advanced/analytics
  // demo section), same as Phase 1.
  const [featured, setFeatured] = useState<Match | null>(null);
  const [prediction, setPrediction] = useState<MatchPrediction | null>(null);

  const loadUpcoming = () => {
    setMatchesError(null);
    setMatches(null);
    Promise.all([getUpcomingMatches(), getTeams(), getVenues()])
      .then(([m, t, v]) => {
        setMatches(m);
        setTeams(t);
        setVenues(v);
      })
      .catch((err) => setMatchesError(err instanceof Error ? err.message : 'Unable to load fixtures from the backend.'));
  };

  useEffect(() => {
    loadUpcoming();
    getFeaturedMatch().then(async (m) => {
      setFeatured(m);
      const p = await getPrediction(m.id, m.teamAId, m.teamBId, m.venueId);
      setPrediction(p);
    });
  }, []);

  const teamById = (id: string) => teams.find((t) => t.id === id);
  const venueById = (id: string) => venues.find((v) => v.id === id);

  const teamA = featured ? getTeamById(featured.teamAId) : undefined;
  const teamB = featured ? getTeamById(featured.teamBId) : undefined;

  const handleAnalyzeFeatured = () => {
    if (!featured) return;
    setConfig({ teamAId: featured.teamAId, teamBId: featured.teamBId, venueId: featured.venueId, date: featured.date, time: featured.time, dayNight: featured.dayNight });
    navigate('/match-setup');
  };

  return (
    <div className="flex flex-col gap-20">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border hairline">
        <div className="absolute inset-0 bg-radial-fade" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(201,162,75,0.12), transparent 35%), radial-gradient(circle at 80% 60%, rgba(62,166,255,0.12), transparent 40%)',
          }}
        />
        <div className="relative px-6 py-16 md:px-16 md:py-24 flex flex-col items-start gap-6 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-medium text-gold-light">
            <BadgeCheck className="h-3.5 w-3.5" /> The Private Intelligence of IPL
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-4xl md:text-6xl font-medium leading-[1.05] text-white"
          >
            Predict the game.<br />Understand the intelligence.
          </motion.h1>
          <p className="max-w-xl text-base text-slate-400">
            Advanced IPL analytics powered by data, player intelligence and predictive technology.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button size="lg" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right" onClick={() => navigate('/match-setup')}>
              Analyze a Match
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/analytics')}>
              Explore Intelligence
            </Button>
          </div>
        </div>
      </section>

      {/* UPCOMING MATCHES */}
      <section className="flex flex-col gap-6">
        <SectionHeader title="Upcoming IPL Matches" description="Configure an analysis for any fixture on the calendar." action={<Button variant="ghost" size="sm" onClick={() => navigate('/matches')}>View all</Button>} />
        {matchesError ? (
          <ErrorState message={matchesError} onRetry={loadUpcoming} />
        ) : !matches ? (
          <LoadingScreen label="Loading fixtures…" />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {matches.slice(0, 3).map((m) => (
              <MatchCard key={m.id} match={m} teamA={teamById(m.teamAId)} teamB={teamById(m.teamBId)} venue={venueById(m.venueId)} />
            ))}
          </div>
        )}
      </section>

      {/* FEATURED MATCH INTELLIGENCE */}
      {featured && prediction && teamA && teamB && (
        <section className="flex flex-col gap-6">
          <SectionHeader title="Featured Match Intelligence" description="Our marquee fixture, broken down by the numbers." />
          <Card glow className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <WinProbability teamA={teamA} teamB={teamB} probA={prediction.winProbability.teamAProbability} probB={prediction.winProbability.teamBProbability} />
              <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gold-light mb-1">Key Match Factor</p>
                <p className="text-sm text-slate-300">{prediction.insights[0]?.text}</p>
              </div>
              <Button onClick={handleAnalyzeFeatured} className="w-fit">Analyze Match</Button>
            </div>
            <div className="flex items-center justify-center">
              <ConfidenceScore score={prediction.winProbability.aiConfidence} />
            </div>
          </Card>
        </section>
      )}

      {/* PLATFORM INTELLIGENCE */}
      <section className="flex flex-col gap-6">
        <SectionHeader title="Platform Intelligence" description="Cric Privé at a glance." />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {[
            { icon: <Radar className="h-5 w-5" />, label: 'IPL Matches Analyzed', value: 1500, suffix: '+' },
            { icon: <BadgeCheck className="h-5 w-5" />, label: 'Players Profiled', value: 240, suffix: '+' },
            { icon: <MapPinned className="h-5 w-5" />, label: 'Venues Analyzed', value: 10 },
            { icon: <Trophy className="h-5 w-5" />, label: 'Prediction Accuracy', value: 87, suffix: '%' },
          ].map((stat) => (
            <Card key={stat.label} className="flex flex-col items-start gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/10 text-gold-light">{stat.icon}</span>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} className="font-display text-3xl text-white" />
              <p className="text-xs text-slate-500">{stat.label}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
