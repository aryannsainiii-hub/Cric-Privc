import React, { createContext, useContext, useMemo, useState } from 'react';
import { teams as allTeams } from '../data/teams';

export interface MatchConfig {
  teamAId: string;
  teamBId: string;
  venueId: string;
  date: string;
  time: string;
  dayNight: 'Day' | 'Night' | 'Day/Night';
}

interface MatchContextValue {
  config: MatchConfig;
  setConfig: (c: Partial<MatchConfig>) => void;
  playingXIA: string[];
  playingXIB: string[];
  setPlayingXIA: (ids: string[]) => void;
  setPlayingXIB: (ids: string[]) => void;
  analysisComplete: boolean;
  setAnalysisComplete: (v: boolean) => void;
  // Set once MatchSetup successfully creates a backend match record.
  // Null means either "not yet configured" or "backend was unreachable
  // when we tried" — either way, screens that use it fall back to a
  // purely local/session-based flow, same as Phase 1.
  matchId: string | null;
  setMatchId: (id: string | null) => void;
}

const defaultConfig: MatchConfig = {
  teamAId: 'mi',
  teamBId: 'csk',
  venueId: 'wankhede',
  date: '2026-09-05',
  time: '19:30',
  dayNight: 'Night',
};

const MatchContext = createContext<MatchContextValue | undefined>(undefined);

export const MatchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfigState] = useState<MatchConfig>(defaultConfig);
  const [playingXIA, setPlayingXIA] = useState<string[]>([]);
  const [playingXIB, setPlayingXIB] = useState<string[]>([]);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [matchId, setMatchId] = useState<string | null>(null);

  const setConfig = (c: Partial<MatchConfig>) => {
    // Changing the fixture invalidates any previously-created backend
    // match record for the old configuration.
    setMatchId(null);
    setConfigState((prev) => ({ ...prev, ...c }));
  };

  const value = useMemo(
    () => ({
      config,
      setConfig,
      playingXIA,
      playingXIB,
      setPlayingXIA,
      setPlayingXIB,
      analysisComplete,
      setAnalysisComplete,
      matchId,
      setMatchId,
    }),
    [config, playingXIA, playingXIB, analysisComplete, matchId]
  );

  return <MatchContext.Provider value={value}>{children}</MatchContext.Provider>;
};

export const useMatch = (): MatchContextValue => {
  const ctx = useContext(MatchContext);
  if (!ctx) throw new Error('useMatch must be used within MatchProvider');
  return ctx;
};

export const allTeamOptions = allTeams;
