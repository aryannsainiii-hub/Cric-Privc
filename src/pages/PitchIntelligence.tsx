import React from 'react';
import SectionHeader from '../components/common/SectionHeader';
import PitchAnalysis from '../components/analytics/PitchAnalysis';
import Card from '../components/common/Card';
import { getVenueById } from '../data/venues';
import { useMatch } from '../context/MatchContext';

const PitchIntelligence: React.FC = () => {
  const { config } = useMatch();
  const venue = getVenueById(config.venueId);
  if (!venue) return null;

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader title="Pitch Intelligence" description="Detailed pitch behaviour and historical scoring patterns for the selected venue." />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PitchAnalysis venue={venue} />
        </div>
        <Card className="flex flex-col gap-4">
          <h3 className="font-display text-lg text-white">Reading This Pitch</h3>
          <p className="text-sm text-slate-400">
            {venue.name} in {venue.city} tends to play as a {venue.pitchType.toLowerCase()} surface. Teams have averaged{' '}
            {venue.avgFirstInningsScore} batting first and {venue.avgSecondInningsScore} chasing, with a{' '}
            {venue.chasingAdvantage > 55 ? 'lean toward chasing sides' : 'slight edge for sides batting first'} across recent seasons.
          </p>
          <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
            <p className="text-xs uppercase tracking-wide text-gold-light mb-1">Demonstration Data</p>
            <p className="text-xs text-slate-500">
              This analysis uses structured mock pitch data. In Phase 3, this module will be powered by a historical
              ball-by-ball data pipeline.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PitchIntelligence;
