import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import Matches from './pages/Matches';
import MatchSetup from './pages/MatchSetup';
import PlayingXIPage from './pages/PlayingXIPage';
import AIAnalysis from './pages/AIAnalysis';
import PredictionDashboard from './pages/PredictionDashboard';
import PitchIntelligence from './pages/PitchIntelligence';
import WeatherIntelligence from './pages/WeatherIntelligence';
import PlayerBattles from './pages/PlayerBattles';
import TossImpact from './pages/TossImpact';
import WhatIfSimulator from './pages/WhatIfSimulator';
import LiveMatchPrediction from './pages/LiveMatchPrediction';
import Tournament from './pages/Tournament';
import TournamentWinnerPrediction from './pages/TournamentWinnerPrediction';
import AIAnalyst from './pages/AIAnalyst';
import Profile from './pages/Profile';
import Analytics from './pages/Analytics';
import NotFound from './pages/NotFound';

const App: React.FC = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="flex-1 mx-auto w-full max-w-[1440px] px-4 md:px-8 py-8">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/match-setup" element={<MatchSetup />} />
        <Route path="/playing-xi" element={<PlayingXIPage />} />
        <Route path="/ai-analysis" element={<AIAnalysis />} />
        <Route path="/prediction-dashboard" element={<PredictionDashboard />} />
        <Route path="/predictions" element={<PredictionDashboard />} />
        <Route path="/pitch-intelligence" element={<PitchIntelligence />} />
        <Route path="/weather-intelligence" element={<WeatherIntelligence />} />
        <Route path="/player-battles" element={<PlayerBattles />} />
        <Route path="/toss-impact" element={<TossImpact />} />
        <Route path="/what-if-simulator" element={<WhatIfSimulator />} />
        <Route path="/live-match" element={<LiveMatchPrediction />} />
        <Route path="/tournament" element={<Tournament />} />
        <Route path="/tournament-winner" element={<TournamentWinnerPrediction />} />
        <Route path="/ai-analyst" element={<AIAnalyst />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

export default App;
