import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gauge, CloudSun, Swords, Coins, FlaskConical, Activity, Trophy, Crown } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import Card from '../components/common/Card';

const modules = [
  { to: '/pitch-intelligence', icon: <Gauge className="h-5 w-5" />, title: 'Pitch Intelligence', desc: 'Batting friendliness, pace and spin assistance by venue.' },
  { to: '/weather-intelligence', icon: <CloudSun className="h-5 w-5" />, title: 'Weather Intelligence', desc: 'Temperature, dew and rain impact on the match.' },
  { to: '/player-battles', icon: <Swords className="h-5 w-5" />, title: 'Player Battles', desc: 'Head-to-head history between key match-ups.' },
  { to: '/toss-impact', icon: <Coins className="h-5 w-5" />, title: 'Toss Impact', desc: 'Win probability across all four toss scenarios.' },
  { to: '/what-if-simulator', icon: <FlaskConical className="h-5 w-5" />, title: 'What-If Simulator', desc: 'Adjust conditions and see the prediction respond live.' },
  { to: '/live-match', icon: <Activity className="h-5 w-5" />, title: 'Live Match Prediction', desc: 'A demonstration of the live win-probability timeline.' },
  { to: '/tournament', icon: <Trophy className="h-5 w-5" />, title: 'Tournament Intelligence', desc: 'Points table and playoff probability.' },
  { to: '/tournament-winner', icon: <Crown className="h-5 w-5" />, title: 'Winner Prediction', desc: "Cric Privé's projected champion." },
];

const Analytics: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6">
      <SectionHeader title="Analytics" description="Explore every intelligence module Cric Privé offers." />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <Card key={m.to} onClick={() => navigate(m.to)} className="cursor-pointer flex flex-col gap-3 hover:border-gold/30 transition-colors">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold-light">{m.icon}</span>
            <h3 className="font-display text-lg text-white">{m.title}</h3>
            <p className="text-sm text-slate-400">{m.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
