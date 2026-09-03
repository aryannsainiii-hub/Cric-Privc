import React from 'react';
import { Bookmark, Clock, Bell, SlidersHorizontal, Star } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { getTeamById } from '../data/teams';

const savedPredictions = [
  { id: 'sp1', label: 'Mumbai Indians vs Chennai Super Kings', result: '67% MI', date: '2 Sep 2026' },
  { id: 'sp2', label: 'Royal Challengers Bengaluru vs Kolkata Knight Riders', result: '55% KKR', date: '30 Aug 2026' },
  { id: 'sp3', label: 'Gujarat Titans vs Lucknow Super Giants', result: '61% GT', date: '27 Aug 2026' },
];

const Profile: React.FC = () => {
  const favouriteTeam = getTeamById('mi');

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader title="Profile" description="Your Cric Privé dashboard, at a glance." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="flex flex-col items-center gap-3 text-center lg:col-span-1">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-royal to-electric text-2xl font-semibold text-white">
            AS
          </div>
          <div>
            <h2 className="font-display text-xl text-white">Arjun Sharma</h2>
            <p className="text-sm text-slate-400">Premium Analyst</p>
          </div>
          <Badge tone="gold"><Star className="h-3 w-3" /> Premium Access</Badge>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-300">
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${favouriteTeam?.primaryColor}, #0D1224)` }}
            >
              {favouriteTeam?.logoInitials}
            </span>
            Favourite Team: {favouriteTeam?.name}
          </div>
        </Card>

        <Card className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Bookmark className="h-4 w-4 text-gold-light" />
            <h3 className="font-display text-lg text-white">Saved Predictions</h3>
          </div>
          <div className="flex flex-col gap-2.5">
            {savedPredictions.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-lg border border-white/8 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-white">{p.label}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1"><Clock className="h-3 w-3" /> {p.date}</p>
                </div>
                <Badge tone="emerald">{p.result}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-royal" />
            <h3 className="font-display text-lg text-white">Preferences</h3>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center justify-between"><span className="text-slate-400">Preferred Units</span><span className="text-white">Metric</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-400">Default Venue Timezone</span><span className="text-white">IST (UTC+5:30)</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-400">Odds Display</span><span className="text-white">Percentage</span></div>
          </div>
        </Card>

        <Card className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-electric" />
            <h3 className="font-display text-lg text-white">Notification Settings</h3>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            {[
              { label: 'Match Start Alerts', enabled: true },
              { label: 'Prediction Updates', enabled: true },
              { label: 'Weekly Intelligence Digest', enabled: false },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between">
                <span className="text-slate-400">{n.label}</span>
                <span className={`h-5 w-9 rounded-full p-0.5 transition-colors ${n.enabled ? 'bg-emerald/70' : 'bg-white/10'}`}>
                  <span className={`block h-4 w-4 rounded-full bg-white transition-transform ${n.enabled ? 'translate-x-4' : ''}`} />
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
