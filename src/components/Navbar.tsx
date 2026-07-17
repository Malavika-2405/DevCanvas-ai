import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Layers, Eye } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { pathname } = useLocation();

  const links = [
    { to: '/', label: 'Home', icon: Sparkles },
    { to: '/builder', label: 'Builder', icon: Layers },
    { to: '/preview', label: 'Preview', icon: Eye },
  ];

  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mt-4 flex items-center justify-between rounded-2xl glass px-4 py-3 shadow-soft">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
              <Sparkles size={18} />
              <span className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
            </span>
            <span className="font-display text-lg font-700 tracking-tight">
              DevCanvas <span className="gradient-text">AI</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 rounded-full bg-slate-100/70 dark:bg-white/[0.04] p-1">
            {links.map((l) => {
              const active = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors
                    ${active ? 'text-white' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-600 to-accent-500 shadow-glow"
                      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                    />
                  )}
                  <span className="relative z-10">{l.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/builder" className="hidden sm:inline-flex btn-primary !px-4 !py-2 text-xs">
              Create Portfolio
            </Link>
            <ThemeToggle compact />
          </div>
        </div>
      </div>
    </header>
  );
}
