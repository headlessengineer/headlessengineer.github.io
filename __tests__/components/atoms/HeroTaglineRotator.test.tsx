// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import React from 'react';
import { render, act } from '@testing-library/react';
import { HeroTaglineRotator } from '../../../components/atoms/HeroTaglineRotator';

const css = readFileSync(
  join(process.cwd(), 'components/atoms/HeroTaglineRotator.module.css'),
  'utf-8',
);
const src = readFileSync(
  join(process.cwd(), 'components/atoms/HeroTaglineRotator.tsx'),
  'utf-8',
);

const TAGLINES = [
  'A technology consultancy for hard business problems',
  'Software Engineering · Solution Architecture · Enterprise Architecture',
  'AI-native, stack-agnostic, outcome-led',
  'Senior engineers and architects, staffed to the problem',
] as const;

function mockMatchMedia(motionReduced: boolean) {
  return vi.fn().mockImplementation((query: string) => ({
    matches: motionReduced && query.includes('reduce'),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe('HeroTaglineRotator - SPEC-015 acceptance criteria', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('matchMedia', mockMatchMedia(false));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  // ── DOM structure ──────────────────────────────────────────────────

  it('renders all taglines as .tagline spans inside .track', () => {
    const { container } = render(<HeroTaglineRotator taglines={TAGLINES} />);
    const track = container.querySelector('.track');
    expect(track).not.toBeNull();
    const spans = track!.querySelectorAll('.tagline');
    expect(spans).toHaveLength(TAGLINES.length);
  });

  it('renders each tagline text in the DOM', () => {
    const { getByText } = render(<HeroTaglineRotator taglines={TAGLINES} />);
    TAGLINES.forEach(t => expect(getByText(t)).toBeInTheDocument());
  });

  it('wraps the track in a .rotator element', () => {
    const { container } = render(<HeroTaglineRotator taglines={TAGLINES} />);
    expect(container.querySelector('.rotator')).not.toBeNull();
  });

  // ── AC2: rotation ─────────────────────────────────────────────────

  it('AC2: track initial inline transform is translateY(0px)', () => {
    const { container } = render(<HeroTaglineRotator taglines={TAGLINES} />);
    const track = container.querySelector<HTMLElement>('.track')!;
    expect(track.style.transform).toBe('translateY(0px)');
  });

  it('AC2: track translates -24px after first 2800ms interval', () => {
    const { container } = render(<HeroTaglineRotator taglines={TAGLINES} />);
    const track = container.querySelector<HTMLElement>('.track')!;

    act(() => { vi.advanceTimersByTime(2800); });

    expect(track.style.transform).toBe('translateY(-24px)');
  });

  it('AC2: track translates -48px after second interval', () => {
    const { container } = render(<HeroTaglineRotator taglines={TAGLINES} />);
    const track = container.querySelector<HTMLElement>('.track')!;

    act(() => { vi.advanceTimersByTime(5600); });

    expect(track.style.transform).toBe('translateY(-48px)');
  });

  it('AC2: index wraps to 0 after cycling through all taglines', () => {
    const { container } = render(
      <HeroTaglineRotator taglines={['a', 'b']} />,
    );
    const track = container.querySelector<HTMLElement>('.track')!;

    act(() => { vi.advanceTimersByTime(2800); }); // index → 1
    expect(track.style.transform).toBe('translateY(-24px)');

    act(() => { vi.advanceTimersByTime(2800); }); // index → 0 (wraps)
    expect(track.style.transform).toBe('translateY(0px)');
  });

  // ── AC3: reduced motion ───────────────────────────────────────────

  it('AC3: prefers-reduced-motion → track stays at translateY(0px), index never advances', () => {
    vi.stubGlobal('matchMedia', mockMatchMedia(true));
    const { container } = render(<HeroTaglineRotator taglines={TAGLINES} />);
    const track = container.querySelector<HTMLElement>('.track')!;

    act(() => { vi.advanceTimersByTime(8400); }); // 3 × 2800ms - no interval fires

    // CSS transition:none suppresses animation; JS never advances index past 0.
    // translateY(0px) is visually identical to no transform.
    expect(track.style.transform).toBe('translateY(0px)');
  });

  it('AC3: prefers-reduced-motion → all taglines still in DOM for AT', () => {
    vi.stubGlobal('matchMedia', mockMatchMedia(true));
    const { getByText } = render(<HeroTaglineRotator taglines={TAGLINES} />);
    TAGLINES.forEach(t => expect(getByText(t)).toBeInTheDocument());
  });

  // ── Source assertions ─────────────────────────────────────────────

  it('source has "use client" directive', () => {
    expect(src).toMatch(/"use client"|'use client'/);
  });

  // ── CSS assertions ────────────────────────────────────────────────

  it('CSS: .rotator sets height: 24px', () => {
    expect(css).toContain('height: 24px');
  });

  it('CSS: .rotator sets overflow: hidden', () => {
    expect(css).toContain('overflow: hidden');
  });

  it('CSS: .rotator margin uses var(--sp-md)', () => {
    expect(css).toContain('var(--sp-md)');
  });

  it('CSS: .track transition uses var(--dur-slower)', () => {
    expect(css).toContain('var(--dur-slower)');
  });

  it('CSS: .track transition uses var(--ease-spring)', () => {
    expect(css).toContain('var(--ease-spring)');
  });

  it('CSS: .tagline color uses var(--primary)', () => {
    expect(css).toContain('var(--primary)');
  });

  it('CSS: reduced-motion block sets transition to none', () => {
    expect(css).toContain('prefers-reduced-motion');
    expect(css).toContain('transition: none');
  });
});
