'use client';
import { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { useTypingAnimation } from '../../lib/useTypingAnimation';
import styles from './CodePanel.module.css';

const CODE = `const engagement = {
  problem: "business, not technical",
  stack: adopt("whatever fits"),
  team: staff(problem.needs),
  // core architect + specialist network
};`;

export function CodePanel(): JSX.Element {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) setActive(true);
  }, []);

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
