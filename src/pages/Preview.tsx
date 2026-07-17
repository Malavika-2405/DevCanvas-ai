import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Edit3, Sparkles, Smartphone, Monitor, Tablet } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Background from '../components/Background';
import PortfolioView from '../components/portfolio/PortfolioView';
import ThemeToggle from '../components/ThemeToggle';
import { usePortfolio } from '../context/PortfolioContext';
import { downloadHtml } from '../lib/download';

type Device = 'mobile' | 'tablet' | 'desktop';

export default function Preview() {
  const { data } = usePortfolio();
  const [device, setDevice] = useState<Device>('desktop');

  const widths: Record<Device, string> = {
    mobile: 'max-w-[390px]',
    tablet: 'max-w-[768px]',
    desktop: 'max-w-none',
  };

  const isEmpty =
    !data.name &&
    !data.title &&
    !data.about &&
    data.skills.length === 0 &&
    data.projects.length === 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <span className="chip">Live Preview</span>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl font-700 tracking-tight">
              Your <span className="gradient-text">portfolio</span>, live
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Updates in real time as you edit. Toggle theme, switch devices, or export.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 rounded-xl glass p-1">
              {([
                { id: 'mobile' as Device, icon: Smartphone },
                { id: 'tablet' as Device, icon: Tablet },
                { id: 'desktop' as Device, icon: Monitor },
              ]).map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDevice(d.id)}
                  className={`relative grid h-8 w-9 place-items-center rounded-lg transition-colors
                    ${device === d.id ? 'text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                  {device === d.id && (
                    <motion.span
                      layoutId="device-pill"
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-600 to-accent-500"
                      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                    />
                  )}
                  <d.icon size={15} className="relative z-10" />
                </button>
              ))}
            </div>
            <ThemeToggle compact />
            <Link to="/builder" className="btn-ghost !py-2 !px-3 text-xs">
              <Edit3 size={14} /> Edit
            </Link>
            <button onClick={() => downloadHtml(data)} className="btn-primary !py-2 !px-3 text-xs">
              <Download size={14} /> Download HTML
            </button>
          </div>
        </div>

        {isEmpty ? (
          <div className="card p-10 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-accent-500/15 text-brand-500">
              <Sparkles size={24} />
            </div>
            <h2 className="mt-4 font-display text-xl font-700">Your portfolio is empty</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Head to the builder and add your details to see them appear here.
            </p>
            <Link to="/builder" className="btn-primary mt-6">
              <Edit3 size={16} /> Go to builder
            </Link>
          </div>
        ) : (
          <motion.div
            layout
            transition={{ duration: 0.35 }}
            className={`mx-auto ${widths[device]} transition-all duration-300`}
          >
            <div className="rounded-3xl glass-strong p-3 sm:p-4 shadow-soft">
              <div className="rounded-2xl overflow-hidden bg-slate-50/60 dark:bg-slate-950/40 p-4 sm:p-6">
                <PortfolioView data={data} />
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
