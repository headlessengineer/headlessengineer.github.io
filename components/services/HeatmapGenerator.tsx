'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { palettes } from '../../theme-palette';
import styles from './HeatmapGenerator.module.css';

// ─── PRNG ─────────────────────────────────────────────────────────────────────

function mulberry32(seed: number): () => number {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

async function hashToSeed(input: string): Promise<number> {
  const encoded = new TextEncoder().encode(input || '\x00');
  const buf = await crypto.subtle.digest('SHA-256', encoded);
  return new Uint32Array(buf)[0];
}

// ─── DATA MODEL ───────────────────────────────────────────────────────────────

type Level = 0 | 1 | 2 | 3 | 4;

interface DayData {
  date: string;
  level: Level;
  count: number;
  dayOfWeek: number;
}

type DensityMode = 'sparse' | 'normal' | 'active';

const DENSITY_WEIGHTS: Record<DensityMode, number[]> = {
  sparse: [0.65, 0.18, 0.10, 0.05, 0.02],
  normal: [0.45, 0.25, 0.17, 0.09, 0.04],
  active: [0.20, 0.28, 0.28, 0.16, 0.08],
};

const COUNT_RANGES: [number, number][] = [
  [0, 0], [1, 3], [3, 8], [6, 14], [10, 20],
];

function generateDays(seed: number, density: DensityMode): DayData[] {
  const rand = mulberry32(seed);
  const weights = DENSITY_WEIGHTS[density];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(today);
  start.setDate(start.getDate() - 364);
  start.setDate(start.getDate() - start.getDay());

  const days: DayData[] = [];
  const cursor = new Date(start);

  while (cursor <= today) {
    const r = rand();
    let cumulative = 0;
    let level: Level = 0;
    for (let i = 0; i < 5; i++) {
      cumulative += weights[i];
      if (r < cumulative) { level = i as Level; break; }
    }
    const [lo, hi] = COUNT_RANGES[level];
    const count = level === 0 ? 0 : Math.floor(rand() * (hi - lo + 1)) + lo;

    days.push({
      date: cursor.toISOString().split('T')[0],
      level,
      count,
      dayOfWeek: cursor.getDay(),
    });

    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}

function toSquare(days: DayData[]): (DayData | null)[][] {
  const side = Math.ceil(Math.sqrt(days.length));
  const cols: (DayData | null)[][] = [];
  for (let col = 0; col < side; col++) {
    const column: (DayData | null)[] = [];
    for (let row = 0; row < side; row++) {
      const idx = col * side + row;
      column.push(idx < days.length ? days[idx] : null);
    }
    cols.push(column);
  }
  return cols;
}

// ─── COLOR HELPERS ────────────────────────────────────────────────────────────

type ColorScheme = 'single' | 'per-level';

function colorWithAlpha(color: string, alpha: number): string {
  if (color.startsWith('#')) {
    const clean = color.replace('#', '');
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `color-mix(in srgb, ${color} ${Math.round(alpha * 100)}%, transparent)`;
}

function deriveDefaults(accent: string): string[] {
  return [
    colorWithAlpha(accent, 0.30),
    colorWithAlpha(accent, 0.52),
    colorWithAlpha(accent, 0.76),
    accent,
  ];
}

// ─── HEATMAP GRID (shared renderer) ──────────────────────────────────────────

interface GridProps {
  weeks: (DayData | null)[][];
  cellSize: number;
  cellColors: string[];
  gap: number;
  borderRadius: number;
  emptyBg: string;
  onMouseEnter: (day: DayData, e: React.MouseEvent) => void;
  onMouseLeave: () => void;
}

function HeatmapGrid({ weeks, cellSize, cellColors, gap, borderRadius, emptyBg, onMouseEnter, onMouseLeave }: GridProps) {
  return (
    <div className={styles.weeksRow} style={{ gap }}>
      {weeks.map((week, wi) => (
        <div key={wi} className={styles.weekCol} style={{ gap }}>
          {week.map((day, di) => {
            const isPadding = day === null;
            const bg = isPadding
              ? 'transparent'
              : day.level === 0
                ? emptyBg
                : cellColors[day.level];
            return (
              <div
                key={di}
                className={styles.cell}
                style={{
                  width: cellSize,
                  height: cellSize,
                  borderRadius,
                  backgroundColor: bg,
                  opacity: isPadding ? 0 : 1,
                  pointerEvents: isPadding ? 'none' : 'auto',
                }}
                onMouseEnter={day ? e => onMouseEnter(day, e) : undefined}
                onMouseLeave={day ? onMouseLeave : undefined}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

interface TooltipState {
  day: DayData;
  x: number;
  y: number;
}

export function HeatmapGenerator() {
  const { theme, config } = useTheme();
  const panelRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState('');
  const [density, setDensity] = useState<DensityMode>('normal');
  const [cellSize, setCellSize] = useState(13);
  const [days, setDays] = useState<DayData[]>([]);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const [colorScheme, setColorScheme] = useState<ColorScheme>('single');
  const [singleColor, setSingleColor] = useState(() => {
    const paletteName = theme === 'dark' ? config.theme.activeDark : config.theme.activeLight;
    return (palettes[paletteName] ?? palettes.dark).accent;
  });
  const [levelColors, setLevelColors] = useState<string[]>(() => {
    const paletteName = theme === 'dark' ? config.theme.activeDark : config.theme.activeLight;
    return deriveDefaults((palettes[paletteName] ?? palettes.dark).accent);
  });

  useEffect(() => {
    let cancelled = false;
    hashToSeed(input).then(seed => {
      if (!cancelled) setDays(generateDays(seed, density));
    });
    return () => { cancelled = true; };
  }, [input, density]);

  const weeks = useMemo(() => toSquare(days), [days]);

  const cellColors = useMemo((): string[] => {
    if (colorScheme === 'single') {
      return [
        '',
        colorWithAlpha(singleColor, 0.22),
        colorWithAlpha(singleColor, 0.45),
        colorWithAlpha(singleColor, 0.72),
        singleColor,
      ];
    }
    return ['', ...levelColors];
  }, [colorScheme, singleColor, levelColors]);

  function handleMouseEnter(day: DayData, e: React.MouseEvent) {
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({ day, x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  function handleMouseLeave() {
    setTooltip(null);
  }

  function updateLevelColor(index: number, color: string) {
    const next = [...levelColors];
    next[index] = color;
    setLevelColors(next);
  }

  const sharedGridProps = {
    weeks,
    cellSize,
    cellColors,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  return (
    <div className={styles.root}>
      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.field}>
          <label className={styles.label}>input string</label>
          <textarea
            className={styles.textarea}
            value={input}
            onChange={e => setInput(e.target.value.slice(0, 256))}
            rows={4}
            placeholder="type anything..."
            spellCheck={false}
          />
          <span className={styles.charCount}>{input.length} / 256</span>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>density</label>
          <div className={styles.radioGroup}>
            {(['sparse', 'normal', 'active'] as DensityMode[]).map(d => (
              <label key={d} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="density"
                  value={d}
                  checked={density === d}
                  onChange={() => setDensity(d)}
                  className={styles.radioInput}
                />
                {d}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>cell size - {cellSize}px</label>
          <input
            type="range"
            min={10}
            max={18}
            step={1}
            value={cellSize}
            onChange={e => setCellSize(Number(e.target.value))}
            className={styles.range}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>color mode</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="colorScheme"
                value="single"
                checked={colorScheme === 'single'}
                onChange={() => setColorScheme('single')}
                className={styles.radioInput}
              />
              single hue
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="colorScheme"
                value="per-level"
                checked={colorScheme === 'per-level'}
                onChange={() => setColorScheme('per-level')}
                className={styles.radioInput}
              />
              per level
            </label>
          </div>
        </div>

        {colorScheme === 'single' && (
          <div className={styles.field}>
            <label className={styles.label}>color</label>
            <div className={styles.colorRow}>
              <input
                type="color"
                value={singleColor}
                onChange={e => setSingleColor(e.target.value)}
                className={styles.colorPicker}
              />
              <span className={styles.colorHex}>{singleColor}</span>
            </div>
          </div>
        )}

        {colorScheme === 'per-level' && (
          <div className={styles.field}>
            <label className={styles.label}>level colors</label>
            <div className={styles.levelColors}>
              {levelColors.map((color, i) => (
                <div key={i} className={styles.levelColorRow}>
                  <span className={styles.levelColorLabel}>level {i + 1}</span>
                  <input
                    type="color"
                    value={color.startsWith('rgba') ? singleColor : color}
                    onChange={e => updateLevelColor(i, e.target.value)}
                    className={styles.colorPicker}
                  />
                  <span className={styles.colorHex}>
                    {color.startsWith('rgba') ? color.slice(0, 20) + '…' : color}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.meta}>
          <p>52 weeks · sha-256 → mulberry32 prng</p>
          <p>deterministic - same input, same pattern</p>
        </div>
      </div>

      {/* Both versions */}
      <div className={styles.graphPanel} ref={panelRef}>
        {days.length > 0 && (
          <>
            <div className={styles.versionBlock}>
              <span className={styles.versionLabel}>v1 - spaced</span>
              <div className={styles.graphScroll}>
                <HeatmapGrid
                  {...sharedGridProps}
                  gap={3}
                  borderRadius={2}
                  emptyBg="var(--surface)"
                />
              </div>
            </div>

            <div className={styles.versionBlock}>
              <span className={styles.versionLabel}>v2 - flat</span>
              <div className={styles.graphScroll}>
                <HeatmapGrid
                  {...sharedGridProps}
                  gap={0}
                  borderRadius={0}
                  emptyBg="var(--bg)"
                />
              </div>
            </div>
          </>
        )}

        {tooltip && (
          <div
            className={styles.tooltip}
            style={{ left: tooltip.x + 12, top: tooltip.y - 40 }}
          >
            <strong>{tooltip.day.count}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
