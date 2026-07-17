import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`relative inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10
        ${compact ? 'h-9 w-9 justify-center' : 'h-10 px-3'}
        bg-white/70 dark:bg-white/[0.04] backdrop-blur
        text-slate-700 dark:text-slate-200 transition-all hover:-translate-y-0.5`}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="flex items-center"
      >
        {isDark ? <Moon size={16} /> : <Sun size={16} />}
      </motion.span>
      {!compact && (
        <span className="text-xs font-semibold capitalize">{theme}</span>
      )}
    </button>
  );
}
