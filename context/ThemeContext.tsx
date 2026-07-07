'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { HeadlessEngineerConfig } from '../types/config';
import { THEME_STORAGE_KEY } from '../lib/theme-storage-key';

type Theme = 'light' | 'dark';

const STORAGE_KEY = THEME_STORAGE_KEY;
const DARK_CLASS = 'dark-mode';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  config: HeadlessEngineerConfig;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(t: Theme): void {
  document.body.classList.toggle(DARK_CLASS, t === 'dark');
  document.documentElement.classList.remove('dark-mode-preload');
  document.documentElement.setAttribute('data-theme', t);
}

export function ThemeProvider({
  children,
  config,
}: {
  children: ReactNode;
  config: HeadlessEngineerConfig;
}) {
  // typeof window guard makes the lazy initializer safe for SSR.
  // ThemeScript sets the correct DOM class before hydration; body has
  // suppressHydrationWarning so any server/client theme mismatch is silent.
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return stored ?? (prefersDark ? 'dark' : 'light');
  });

  useEffect(() => {
    applyTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // sync DOM on first mount; toggleTheme handles subsequent updates

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, config }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export function useThemeConfig(): HeadlessEngineerConfig {
  return useTheme().config;
}
