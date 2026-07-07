'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '../atoms/Button';
import { useTheme } from '../../context/ThemeContext';
import { palettes } from '../../theme-palette';
import styles from './VisualHashGenerator.module.css';

const GRID = 64;
const HALF = GRID / 2;

function mulberry32(seed: number): () => number {
  let s = seed;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

async function buildMatrix(input: string): Promise<boolean[][]> {
  const encoded = new TextEncoder().encode(input || '\x00');
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  const u32 = new Uint32Array(hashBuffer);
  const rand = mulberry32(u32[0]);

  const m: boolean[][] = Array.from({ length: GRID }, () =>
    new Array<boolean>(GRID).fill(false)
  );

  for (let y = 0; y < HALF; y++) {
    for (let x = 0; x < HALF; x++) {
      m[y][x] = rand() > 0.5;
    }
  }
  for (let y = 0; y < HALF; y++) {
    for (let x = 0; x < HALF; x++) {
      m[y][GRID - 1 - x] = m[y][x];
    }
  }
  for (let y = 0; y < HALF; y++) {
    for (let x = 0; x < GRID; x++) {
      m[GRID - 1 - y][x] = m[y][x];
    }
  }
  return m;
}

function renderMatrix(
  canvas: HTMLCanvasElement,
  matrix: boolean[][],
  cellSize: number,
  fg: string,
  bg: string
) {
  const dim = GRID * cellSize;
  canvas.width = dim;
  canvas.height = dim;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, dim, dim);
  ctx.fillStyle = fg;
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      if (matrix[y][x]) {
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

function renderTessellation(
  canvas: HTMLCanvasElement,
  source: HTMLCanvasElement,
  tiles: number
) {
  const tileSize = source.width;
  const dim = tileSize * tiles;
  canvas.width = dim;
  canvas.height = dim;
  const ctx = canvas.getContext('2d')!;
  for (let ty = 0; ty < tiles; ty++) {
    for (let tx = 0; tx < tiles; tx++) {
      ctx.drawImage(source, tx * tileSize, ty * tileSize);
    }
  }
}

type ColorMode = 'accent' | 'foreground' | 'inverted';

export function VisualHashGenerator() {
  const [input, setInput] = useState('');
  const [cellSize, setCellSize] = useState(6);
  const [colorMode, setColorMode] = useState<ColorMode>('accent');
  const [matrix, setMatrix] = useState<boolean[][] | null>(null);
  const [error, setError] = useState('');

  const mainRef = useRef<HTMLCanvasElement>(null);
  const tessRef = useRef<HTMLCanvasElement>(null);

  const { theme, config } = useTheme();

  function resolveColors(mode: ColorMode): { fg: string; bg: string } {
    const paletteName = theme === 'dark' ? config.theme.activeDark : config.theme.activeLight;
    const p = palettes[paletteName] ?? palettes.dark;
    switch (mode) {
      case 'accent':     return { fg: p.accent,      bg: p.background };
      case 'foreground': return { fg: p.foreground,  bg: p.background };
      case 'inverted':   return { fg: p.background,  bg: p.accent };
    }
  }

  const generate = useCallback(async () => {
    setError('');
    try {
      const m = await buildMatrix(input);
      setMatrix(m);
    } catch {
      setError('failed to generate pattern');
    }
  }, [input]);

  useEffect(() => {
    const timer = setTimeout(generate, 250);
    return () => clearTimeout(timer);
  }, [generate]);

  useEffect(() => {
    if (!matrix || !mainRef.current || !tessRef.current) return;
    const { fg, bg } = resolveColors(colorMode);
    renderMatrix(mainRef.current, matrix, cellSize, fg, bg);
    renderTessellation(tessRef.current, mainRef.current, 3);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matrix, cellSize, colorMode, theme]);

  function download() {
    if (!mainRef.current) return;
    const url = mainRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `visual-hash-${(input.slice(0, 20) || 'empty').replace(/\s+/g, '-')}.png`;
    a.click();
  }

  return (
    <div className={styles.root}>
      <div className={styles.controls}>
        <div className={styles.field}>
          <label className={styles.label}>input string</label>
          <textarea
            className={styles.textarea}
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, 256))}
            rows={5}
            placeholder="type anything..."
            spellCheck={false}
          />
          <span className={styles.charCount}>{input.length} / 256</span>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>cell size - {cellSize}px</label>
          <input
            type="range"
            min={4}
            max={10}
            step={1}
            value={cellSize}
            onChange={(e) => setCellSize(Number(e.target.value))}
            className={styles.range}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>color mode</label>
          <div className={styles.radioGroup}>
            {(['accent', 'foreground', 'inverted'] as ColorMode[]).map((m) => (
              <label key={m} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="colorMode"
                  value={m}
                  checked={colorMode === m}
                  onChange={() => setColorMode(m)}
                  className={styles.radioInput}
                />
                {m}
              </label>
            ))}
          </div>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.actions}>
          <Button onClick={download} disabled={!matrix}>
            download png
          </Button>
        </div>

        <div className={styles.meta}>
          <p>grid: 64×64 modules, 4-way radial symmetry</p>
          <p>algorithm: sha-256 → mulberry32 prng → mirrored quadrant</p>
        </div>
      </div>

      <div className={styles.preview}>
        <div className={styles.previewSection}>
          <span className={styles.previewLabel}>pattern</span>
          <div className={styles.canvasWrap}>
            <canvas ref={mainRef} className={styles.canvas} />
          </div>
        </div>
        <div className={styles.previewSection}>
          <span className={styles.previewLabel}>tessellation (3×3)</span>
          <div className={styles.canvasWrap}>
            <canvas ref={tessRef} className={styles.tessCanvas} />
          </div>
        </div>
      </div>
    </div>
  );
}
