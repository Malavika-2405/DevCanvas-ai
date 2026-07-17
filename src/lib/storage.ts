import { PortfolioData, emptyPortfolio } from '../types/portfolio';

const KEY = 'devcanvas:portfolio:v1';

export function loadPortfolio(): PortfolioData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...emptyPortfolio };
    const parsed = JSON.parse(raw) as Partial<PortfolioData>;
    return {
      ...emptyPortfolio,
      ...parsed,
      social: { ...emptyPortfolio.social, ...(parsed.social ?? {}) },
    };
  } catch {
    return { ...emptyPortfolio };
  }
}

export function savePortfolio(data: PortfolioData): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...data, updatedAt: Date.now() }));
  } catch (err) {
    console.warn('Failed to persist portfolio', err);
  }
}

export function clearPortfolio(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}
