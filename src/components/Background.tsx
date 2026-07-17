import { useTheme } from '../context/ThemeContext';

export default function Background() {
  const { theme } = useTheme();
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            theme === 'dark'
              ? 'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)'
              : 'linear-gradient(to right, rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)',
        }}
      />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[680px] rounded-full bg-brand-500/20 blur-[120px]" />
      <div className="absolute top-1/3 -right-24 h-[360px] w-[360px] rounded-full bg-accent-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -left-24 h-[320px] w-[320px] rounded-full bg-brand-400/15 blur-[120px]" />
    </div>
  );
}
