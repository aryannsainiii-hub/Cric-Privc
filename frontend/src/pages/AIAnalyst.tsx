import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { getTeamById } from '../data/teams';
import { computeWinProbability } from '../data/predictions';
import { useMatch } from '../context/MatchContext';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

const AIAnalyst: React.FC = () => {
  const { config } = useMatch();
  const teamA = getTeamById(config.teamAId);
  const teamB = getTeamById(config.teamBId);
  const { teamAProbability, teamBProbability } = computeWinProbability(config.teamAId, config.teamBId, config.venueId);
  const favoured = teamAProbability >= teamBProbability ? teamA : teamB;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: `Hi, I'm the Cric Privé AI Analyst. Ask me anything about ${teamA?.name} vs ${teamB?.name} — I'm running on demonstration responses for Phase 1.`,
    },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const buildResponse = (question: string): string => {
    const q = question.toLowerCase();
    if (q.includes('why') && (q.includes('higher') || q.includes('favour') || q.includes('probability'))) {
      return `${favoured?.name}'s demonstration score is primarily influenced by recent team form and historical venue performance at the selected ground.`;
    }
    if (q.includes('toss')) {
      return 'Toss impact is moderate here — the demonstration model gives roughly a 5–8 point swing depending on the decision to bat or bowl first.';
    }
    if (q.includes('weather') || q.includes('rain') || q.includes('dew')) {
      return 'Conditions data suggests dew could play a role under lights, which typically nudges the advantage toward the chasing side.';
    }
    if (q.includes('pitch') || q.includes('surface')) {
      return 'The pitch profile for this venue leans toward balanced conditions, offering something for both batters and bowlers depending on the phase of the innings.';
    }
    if (q.includes('player') || q.includes('battle') || q.includes('match up')) {
      return 'Individual player battles are a meaningful factor — check the Player Battles page for head-to-head history between key match-ups.';
    }
    if (q.includes('confidence')) {
      return "AI confidence reflects how large the gap is between the two teams' underlying scores — a bigger spread means higher confidence.";
    }
    return `That's a great question. In Phase 1, I can share demonstration insights on form, venue history, pitch and weather conditions for ${teamA?.name} vs ${teamB?.name}. Try asking about the toss, the pitch, or why one side is favoured.`;
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', text: trimmed };
    const assistantMsg: ChatMessage = { id: `a-${Date.now()}`, role: 'assistant', text: buildResponse(trimmed) };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput('');
  };

  const suggestions = ['Why does one team have a higher probability?', 'How does the toss affect this match?', 'What does the pitch favour?'];

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <SectionHeader
        title="Cric Privé AI Analyst"
        description="Ask anything about IPL matchups."
        action={<Badge tone="royal">Demonstration Responses — Phase 1</Badge>}
      />

      <Card padded={false} className="flex flex-col h-[560px] overflow-hidden">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${m.role === 'assistant' ? 'bg-royal/15 text-royal' : 'bg-gold/15 text-gold-light'}`}>
                {m.role === 'assistant' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </span>
              <div className={`max-w-[75%] rounded-xl px-4 py-2.5 text-sm ${m.role === 'assistant' ? 'bg-white/[0.04] text-slate-200' : 'bg-gold/10 text-white'}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t hairline p-3 flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button key={s} onClick={() => setInput(s)} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400 hover:text-white hover:border-white/20">
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about IPL…"
              className="flex-1 rounded-lg border border-white/10 bg-obsidian-800 px-3.5 py-2.5 text-sm text-white outline-none focus:border-gold/50"
            />
            <button onClick={handleSend} className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold text-obsidian-950 hover:shadow-glow">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIAnalyst;
