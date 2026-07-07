'use client';

import { useState, useEffect, useRef } from 'react';
import { create } from 'qrcode';
import { Button } from '../atoms/Button';
import { useTheme } from '../../context/ThemeContext';
import { palettes } from '../../theme-palette';
import styles from './QRGenerator.module.css';

type ECLevel = 'L' | 'M' | 'Q' | 'H';
type QRStyle = 'sharp' | 'dot';
type ColorMode = 'foreground' | 'accent' | 'inverted';

const EC_LABELS: Record<ECLevel, string> = {
  L: 'L - 7% recovery',
  M: 'M - 15% recovery',
  Q: 'Q - 25% recovery',
  H: 'H - 30% recovery',
};

function renderQR(
  canvas: HTMLCanvasElement,
  text: string,
  ecLevel: ECLevel,
  cellSize: number,
  qrStyle: QRStyle,
  fg: string,
  bg: string
): string | null {
  if (!text.trim()) return 'enter text to generate a QR code';
  let qr: ReturnType<typeof create>;
  try {
    qr = create(text, { errorCorrectionLevel: ecLevel });
  } catch {
    return 'text is too long for the selected error correction level';
  }

  const size = qr.modules.size;
  const margin = 2;
  const totalModules = size + margin * 2;
  const dim = totalModules * cellSize;

  canvas.width = dim;
  canvas.height = dim;

  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, dim, dim);
  ctx.fillStyle = fg;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!qr.modules.get(row, col)) continue;
      const x = (col + margin) * cellSize;
      const y = (row + margin) * cellSize;
      if (qrStyle === 'dot') {
        const cx = x + cellSize / 2;
        const cy = y + cellSize / 2;
        const r = cellSize * 0.42;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(x, y, cellSize, cellSize);
      }
    }
  }
  return null;
}

export function QRGenerator() {
  const [input, setInput] = useState('');
  const [ecLevel, setECLevel] = useState<ECLevel>('M');
  const [qrStyle, setQRStyle] = useState<QRStyle>('sharp');
  const [cellSize, setCellSize] = useState(8);
  const [colorMode, setColorMode] = useState<ColorMode>('foreground');
  const [renderError, setRenderError] = useState('');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, config } = useTheme();

  function resolveColors(mode: ColorMode): { fg: string; bg: string } {
    const paletteName = theme === 'dark' ? config.theme.activeDark : config.theme.activeLight;
    const p = palettes[paletteName] ?? palettes.dark;
    switch (mode) {
      case 'accent':     return { fg: p.accent,      bg: p.background };
      case 'foreground': return { fg: p.foreground,  bg: p.background };
      case 'inverted':   return { fg: p.background,  bg: p.foreground };
    }
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    const { fg, bg } = resolveColors(colorMode);
    const err = renderQR(canvasRef.current, input, ecLevel, cellSize, qrStyle, fg, bg);
    setRenderError(err ?? '');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, ecLevel, qrStyle, cellSize, colorMode, theme]);

  function download() {
    if (!canvasRef.current || renderError) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `qr-${(input.slice(0, 30) || 'empty').replace(/[^a-z0-9]/gi, '-')}.png`;
    a.click();
  }

  return (
    <div className={styles.root}>
      <div className={styles.controls}>
        <div className={styles.field}>
          <label className={styles.label}>input text / url</label>
          <textarea
            className={styles.textarea}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
            placeholder="https://example.com"
            spellCheck={false}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>error correction</label>
          <div className={styles.radioGroup}>
            {(['L', 'M', 'Q', 'H'] as ECLevel[]).map((ec) => (
              <label key={ec} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="ecLevel"
                  value={ec}
                  checked={ecLevel === ec}
                  onChange={() => setECLevel(ec)}
                  className={styles.radioInput}
                />
                {EC_LABELS[ec]}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>style</label>
          <div className={styles.radioGroup}>
            {(['sharp', 'dot'] as QRStyle[]).map((s) => (
              <label key={s} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="qrStyle"
                  value={s}
                  checked={qrStyle === s}
                  onChange={() => setQRStyle(s)}
                  className={styles.radioInput}
                />
                {s}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>cell size - {cellSize}px</label>
          <input
            type="range"
            min={6}
            max={14}
            step={1}
            value={cellSize}
            onChange={(e) => setCellSize(Number(e.target.value))}
            className={styles.range}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>color mode</label>
          <div className={styles.radioGroup}>
            {(['foreground', 'accent', 'inverted'] as ColorMode[]).map((m) => (
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

        {renderError && <p className={styles.error}>{renderError}</p>}

        <div className={styles.actions}>
          <Button onClick={download} disabled={!input.trim() || !!renderError}>
            download png
          </Button>
        </div>

        <div className={styles.meta}>
          <p>outputs standard iso/iec 18004 qr codes</p>
          <p>scannable by ios / android native camera</p>
        </div>
      </div>

      <div className={styles.preview}>
        <span className={styles.previewLabel}>preview</span>
        <div className={styles.canvasWrap}>
          {!input.trim() ? (
            <div className={styles.placeholder}>enter text to generate</div>
          ) : (
            <canvas ref={canvasRef} className={styles.canvas} />
          )}
        </div>
      </div>
    </div>
  );
}
