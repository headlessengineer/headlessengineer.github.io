'use client';
import { useSyncExternalStore } from 'react';
import type { JSX } from 'react';
import { useTypingAnimation } from '../../lib/useTypingAnimation';
import styles from './CodePanel.module.css';

const CODE = `const engagement = {
  problem: "business, not technical",
  stack: adopt("whatever fits"),
  team: staff(problem.needs),
  // core architect + specialist network
};`;

function subscribe(onChange: () => void): () => void {
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

function getSnapshot(): boolean {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function CodePanel(): JSX.Element {
  const active = useSyncExternalStore(subscribe, getSnapshot, () => false);

  const { visibleText } = useTypingAnimation(active ? CODE : '', 28);
  const displayText = active ? visibleText : CODE;

  return (
    <div className={styles.codePanel} aria-hidden="true">
      <div className={styles.codePanelHeader}>
        <span className={styles.codeDot} />
        <span className={styles.codeDot} />
        <span className={styles.codeDot} />
      </div>
      <pre className={styles.typingArea}>
        {displayText}
        {active && <span className={styles.cursor}>|</span>}
      </pre>
    </div>
  );
}
