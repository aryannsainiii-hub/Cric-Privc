import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound: React.FC = () => (
  <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
    <p className="font-display text-6xl text-gold-light">404</p>
    <h1 className="font-display text-2xl text-white">This intelligence report doesn't exist.</h1>
    <p className="text-sm text-slate-400">The page you're looking for may have moved.</p>
    <Link to="/"><Button>Back to Home</Button></Link>
  </div>
);

export default NotFound;
