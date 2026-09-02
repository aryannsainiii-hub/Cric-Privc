import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Bell, Menu, Search, X, Crown } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/matches', label: 'Matches' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/tournament', label: 'Tournament' },
  { to: '/predictions', label: 'Predictions' },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b hairline bg-obsidian-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2.5">
          <Crown className="h-5 w-5 text-gold" strokeWidth={1.5} />
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            Cric <span className="text-gradient-gold">Privé</span>
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-white/5 text-gold-light' : 'text-slate-400 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button aria-label="Search" className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-white/5 hover:text-white">
            <Search className="h-4 w-4" />
          </button>
          <button aria-label="Notifications" className="relative hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-white/5 hover:text-white">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-warn" />
          </button>
          <NavLink to="/profile" className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-royal to-electric text-xs font-semibold text-white">
            AS
          </NavLink>
          <button
            aria-label="Toggle menu"
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-300 hover:bg-white/5"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t hairline px-4 py-3">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-white/5 text-gold-light' : 'text-slate-300'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/profile" onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-slate-300">
              Profile
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
