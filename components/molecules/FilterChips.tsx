'use client';

import type { JSX } from 'react';
import styles from './FilterChips.module.css';

export interface FilterChip {
  id: string;
  label: string;
}

export interface FilterChipsProps {
  chips: FilterChip[];
  activeId: string;
  onChange: (id: string) => void;
}

export function FilterChips({ chips, activeId, onChange }: FilterChipsProps): JSX.Element {
  return (
    <div role="group" aria-label="Filter by category" className={styles.filterRow}>
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          aria-pressed={chip.id === activeId}
          className={chip.id === activeId
            ? `${styles.chip} ${styles.chipActive}`
            : styles.chip}
          onClick={() => onChange(chip.id)}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}
