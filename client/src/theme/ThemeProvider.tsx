import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  mode: ThemeMode;
  primaryColor: string;
  setMode: (mode: ThemeMode) => void;
  setPrimaryColor: (color: string) => void;
  resetTheme: () => void;
}

const DEFAULT_PRIMARY = '#2563eb';
const MODE_STORAGE_KEY = 'themeMode';
const COLOR_STORAGE_KEY = 'themePrimaryColor';
const ThemeContext = createContext<ThemeContextValue | null>(null);

function hexToHsl(hex: string): string {
  const normalized = hex.replace('#', '');
  const r = parseInt(normalized.slice(0, 2), 16) / 255;
  const g = parseInt(normalized.slice(2, 4), 16) / 255;
  const b = parseInt(normalized.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function getInitialMode(): ThemeMode {
  const stored = localStorage.getItem(MODE_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialPrimaryColor(): string {
  return localStorage.getItem(COLOR_STORAGE_KEY) || DEFAULT_PRIMARY;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(getInitialMode);
  const [primaryColor, setPrimaryColorState] = useState(getInitialPrimaryColor);

  const setMode = (nextMode: ThemeMode) => {
    localStorage.setItem(MODE_STORAGE_KEY, nextMode);
    setModeState(nextMode);
  };

  const setPrimaryColor = (nextColor: string) => {
    localStorage.setItem(COLOR_STORAGE_KEY, nextColor);
    setPrimaryColorState(nextColor);
  };

  const resetTheme = () => {
    localStorage.removeItem(MODE_STORAGE_KEY);
    localStorage.removeItem(COLOR_STORAGE_KEY);
    setModeState('light');
    setPrimaryColorState(DEFAULT_PRIMARY);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  useEffect(() => {
    const hsl = hexToHsl(primaryColor);
    document.documentElement.style.setProperty('--primary', hsl);
    document.documentElement.style.setProperty('--ring', hsl);
    document.documentElement.style.setProperty('--sidebar-primary', hsl);
    document.documentElement.style.setProperty('--sidebar-ring', hsl);
  }, [primaryColor]);

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, primaryColor, setMode, setPrimaryColor, resetTheme }),
    [mode, primaryColor],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
