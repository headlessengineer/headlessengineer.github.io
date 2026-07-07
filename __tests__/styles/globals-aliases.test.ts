import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect, beforeAll } from 'vitest';

const GLOBALS_PATH = join(process.cwd(), 'app/styles/globals.css');

let css: string;
let rootBlock: string;
let darkModeBlock: string;

beforeAll(() => {
  css = readFileSync(GLOBALS_PATH, 'utf-8');

  const rootMatch = css.match(/:root\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/);
  rootBlock = rootMatch ? rootMatch[1] : '';

  const darkMatch = css.match(/body\.dark-mode[\s,\n]*html\.dark-mode-preload\s*\{([^}]*)\}/);
  darkModeBlock = darkMatch ? darkMatch[1] : '';
});

describe('globals.css - short-name alias block', () => {
  describe('spacing aliases (AC-1, AC-2)', () => {
    it('defines --sp-2xs as var(--space-1)', () => {
      expect(rootBlock).toMatch(/--sp-2xs:\s*var\(--space-1\)/);
    });
    it('defines --sp-xs as var(--space-2)', () => {
      expect(rootBlock).toMatch(/--sp-xs:\s*var\(--space-2\)/);
    });
    it('defines --sp-sm as var(--space-3)', () => {
      expect(rootBlock).toMatch(/--sp-sm:\s*var\(--space-3\)/);
    });
    it('defines --sp-md as var(--space-4)', () => {
      expect(rootBlock).toMatch(/--sp-md:\s*var\(--space-4\)/);
    });
    it('defines --sp-lg as var(--space-6)', () => {
      expect(rootBlock).toMatch(/--sp-lg:\s*var\(--space-6\)/);
    });
    it('defines --sp-xl as var(--space-8)', () => {
      expect(rootBlock).toMatch(/--sp-xl:\s*var\(--space-8\)/);
    });
    it('defines --sp-2xl as var(--space-10)', () => {
      expect(rootBlock).toMatch(/--sp-2xl:\s*var\(--space-10\)/);
    });
    it('defines --sp-3xl as var(--space-12)', () => {
      expect(rootBlock).toMatch(/--sp-3xl:\s*var\(--space-12\)/);
    });
    it('defines --sp-4xl as var(--space-16)', () => {
      expect(rootBlock).toMatch(/--sp-4xl:\s*var\(--space-16\)/);
    });
    it('defines --sp-5xl as var(--space-20)', () => {
      expect(rootBlock).toMatch(/--sp-5xl:\s*var\(--space-20\)/);
    });

    it('preserves existing --space-6: 24px (AC-2)', () => {
      expect(rootBlock).toMatch(/--space-6:\s*24px/);
    });
  });

  describe('radius aliases', () => {
    it('defines --r-sm as var(--radius-sm)', () => {
      expect(rootBlock).toMatch(/--r-sm:\s*var\(--radius-sm\)/);
    });
    it('defines --r-md as var(--radius-md)', () => {
      expect(rootBlock).toMatch(/--r-md:\s*var\(--radius-md\)/);
    });
    it('defines --r-lg as var(--radius-lg)', () => {
      expect(rootBlock).toMatch(/--r-lg:\s*var\(--radius-lg\)/);
    });
    it('defines --r-xl as var(--radius-xl)', () => {
      expect(rootBlock).toMatch(/--r-xl:\s*var\(--radius-xl\)/);
    });
    it('defines --r-full as var(--radius-full)', () => {
      expect(rootBlock).toMatch(/--r-full:\s*var\(--radius-full\)/);
    });
  });

  describe('duration aliases (AC-3)', () => {
    it('defines --dur-fast as var(--duration-fast)', () => {
      expect(rootBlock).toMatch(/--dur-fast:\s*var\(--duration-fast\)/);
    });
    it('defines --dur-base as var(--duration-base)', () => {
      expect(rootBlock).toMatch(/--dur-base:\s*var\(--duration-base\)/);
    });
    it('defines --dur-slow as var(--duration-slow)', () => {
      expect(rootBlock).toMatch(/--dur-slow:\s*var\(--duration-slow\)/);
    });
    it('defines --dur-slower as 400ms (raw value - no long-name source)', () => {
      expect(rootBlock).toMatch(/--dur-slower:\s*400ms/);
    });
  });

  describe('opacity aliases', () => {
    it('defines --op-dim as var(--opacity-dim)', () => {
      expect(rootBlock).toMatch(/--op-dim:\s*var\(--opacity-dim\)/);
    });
    it('defines --op-muted as var(--opacity-muted)', () => {
      expect(rootBlock).toMatch(/--op-muted:\s*var\(--opacity-muted\)/);
    });
    it('defines --op-subtle as var(--opacity-subtle)', () => {
      expect(rootBlock).toMatch(/--op-subtle:\s*var\(--opacity-subtle\)/);
    });
    it('defines --op-full as var(--opacity-full)', () => {
      expect(rootBlock).toMatch(/--op-full:\s*var\(--opacity-full\)/);
    });
  });

  describe('layout aliases (AC-4)', () => {
    it('defines --prose-max as var(--prose-max-width)', () => {
      expect(rootBlock).toMatch(/--prose-max:\s*var\(--prose-max-width\)/);
    });
    it('defines --card-min as var(--size-card-min)', () => {
      expect(rootBlock).toMatch(/--card-min:\s*var\(--size-card-min\)/);
    });
    it('preserves --prose-max-width: 65ch (source token)', () => {
      expect(rootBlock).toMatch(/--prose-max-width:\s*65ch/);
    });
  });

  describe('ease-spring guard (AC-5)', () => {
    it('--ease-spring appears exactly once in the file', () => {
      const matches = css.match(/--ease-spring/g);
      expect(matches).not.toBeNull();
      expect(matches?.length).toBe(1);
    });
  });

  describe('dark-mode guard', () => {
    it('dark-mode block was extracted successfully', () => {
      expect(darkModeBlock.length).toBeGreaterThan(0);
    });
    it('no short-name alias appears inside body.dark-mode block', () => {
      expect(darkModeBlock).not.toMatch(/--sp-|--r-[a-z0-9]|--dur-|--op-|--prose-max|--card-min/);
    });
  });
});
