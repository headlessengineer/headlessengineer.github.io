'use client';

import { useState } from 'react';
import type { JSX } from 'react';
import { FilterChips } from './FilterChips';
import type { FilterChip } from './FilterChips';
import { ServiceCard } from './ServiceCard';
import type { ServiceCardProps } from './ServiceCard';
import { CardRows, CardRow } from '../atoms/CardRows';

export interface Offering {
  category: string;
  cardProps: ServiceCardProps;
}

export interface FilterableOfferingsProps {
  chips: FilterChip[];
  offerings: Offering[];
}

// Splits items into groups of up to 3 for row-balanced card layout.
function chunkByThree<T>(items: T[]): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += 3) {
    chunks.push(items.slice(i, i + 3));
  }
  return chunks;
}

export function FilterableOfferings({ chips, offerings }: FilterableOfferingsProps): JSX.Element {
  const [activeId, setActiveId] = useState('all');

  const visible = offerings.filter(
    (o) => activeId === 'all' || o.category === activeId,
  );

  return (
    <div>
      <FilterChips chips={chips} activeId={activeId} onChange={setActiveId} />
      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {`Showing ${visible.length} service${visible.length === 1 ? '' : 's'}`}
      </p>
      <CardRows>
        {chunkByThree(visible).map((chunk, rowIdx) => (
          // rowIdx/colIdx keys are safe: offerings is a static config list, never reordered at runtime
          <CardRow key={rowIdx} cols={Math.min(chunk.length, 3) as 1 | 2 | 3}>
            {chunk.map((o, colIdx) => (
              <div key={colIdx} data-category={o.category}>
                <ServiceCard {...o.cardProps} />
              </div>
            ))}
          </CardRow>
        ))}
      </CardRows>
    </div>
  );
}
