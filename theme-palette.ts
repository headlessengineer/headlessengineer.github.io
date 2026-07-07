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
    background: '#ffffff',
    foreground: '#0a0a0a',
    accent: '#009999',
    muted: '#808080',
    tertiary: '#f2f2f2',
  },
  dark: {
    background: '#0a0a0a',
    foreground: '#ffffff',
    accent: '#009999',
    muted: '#808080',
    tertiary: '#1f1f1f',
  },
};
