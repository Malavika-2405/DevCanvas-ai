import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { PortfolioData, emptyPortfolio } from '../types/portfolio';
import { loadPortfolio, savePortfolio } from '../lib/storage';

interface PortfolioContextValue {
  data: PortfolioData;
  setData: (updater: (prev: PortfolioData) => PortfolioData) => void;
  update: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => void;
  reset: () => void;
}

const PortfolioContext = createContext<PortfolioContextValue | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<PortfolioData>(() => {
    if (typeof window === 'undefined') return { ...emptyPortfolio };
    return loadPortfolio();
  });

  useEffect(() => {
    savePortfolio(data);
  }, [data]);

  const setData = (updater: (prev: PortfolioData) => PortfolioData) =>
    setDataState((prev) => updater(prev));

  const update = <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) =>
    setDataState((prev) => ({ ...prev, [key]: value }));

  const reset = () => setDataState({ ...emptyPortfolio, updatedAt: Date.now() });

  const value = useMemo(
    () => ({ data, setData, update, reset }),
    [data, setData, update, reset],
  );

  return (
    <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
  );
}

export function usePortfolio(): PortfolioContextValue {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
