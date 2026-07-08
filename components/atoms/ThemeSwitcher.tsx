'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeSwitcher.module.css';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  // Server snapshot → false (light/sun). Client snapshot → true (mounted).
  // React uses the server snapshot during hydration so server and client both
  // render the sun icon, eliminating the SVG structure mismatch. After
  // hydration React transitions to the client snapshot and the correct icon
  // is shown. No setState + no useEffect → no lint violation.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isDark = mounted && theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={styles.switcher}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {isDark ? (
          <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        )}
      </svg>
    </button>
  );
}
