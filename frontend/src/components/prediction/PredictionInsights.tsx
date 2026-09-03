import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { KeyInsight } from '../../types/prediction';

const PredictionInsights: React.FC<{ insights: KeyInsight[] }> = ({ insights }) => (
  <div className="flex flex-col gap-3">
    {insights.map((insight) => (
      <div key={insight.id} className="flex items-start gap-2.5">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
        <p className="text-sm text-slate-300">{insight.text}</p>
      </div>
    ))}
  </div>
);

export default PredictionInsights;
