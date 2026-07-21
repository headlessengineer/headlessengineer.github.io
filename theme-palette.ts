import type { ThemeName } from './types/config';

export interface ThemePalette {
  background: string;
  foreground: string;
  accent: string;
  muted: string;
  tertiary: string;
}

export const palettes: Record<ThemeName, ThemePalette> = {
  light: {
    background: 'var(--n-50)',
    foreground: 'var(--n-950)',
    accent: 'var(--accent-brand)',
    muted: 'var(--n-500)',
    tertiary: 'var(--n-100)',
  },
  dark: {
    background: 'var(--n-950)',
    foreground: 'var(--white)',
    accent: 'var(--accent-brand)',
    muted: 'var(--n-500)',
    tertiary: 'var(--n-800)',
  },
};
