import React from 'react';
import { Crown } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="border-t hairline mt-20">
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-slate-400">
        <Crown className="h-4 w-4 text-gold" strokeWidth={1.5} />
        <span className="text-sm">Cric Privé — The Private Intelligence of IPL</span>
      </div>
      <p className="text-xs text-slate-500 max-w-md sm:text-right">
        Phase 1 demonstration build. Predictions shown are illustrative and generated from structured mock
        data, not a trained machine learning model.
      </p>
    </div>
  </footer>
);

export default Footer;
