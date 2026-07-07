'use client';

import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeSwitcher.module.css';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={styles.switcher}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      suppressHydrationWarning
    >
      {theme === 'light' ? '☾' : '☀'}
    </button>
  );
}
