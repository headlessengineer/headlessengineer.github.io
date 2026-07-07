# HTML Slide Template

Complete HTML structure with navigation and headlessengineer tokens. Chart.js
available via npm (not CDN — see integration section).

## Base Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Presentation Title</title>
    <style>
        /* headlessengineer design tokens */
        :root {
            --bg:           #0a0a0a;   /* n-950 */
            --fg:           #fafafa;   /* n-50  */
            --fg-secondary: rgba(250,250,250,0.6);
            --surface:      #141414;   /* n-900 */
            --primary:      #009999;
            --on-primary:   #ffffff;

            --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

            --motion-fast:   150ms;
            --motion-normal: 300ms;
        }

        /* Base */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: var(--bg);
            color: var(--fg);
            font-family: var(--font-sans);
            overflow: hidden;
        }

        /* 16:9 Aspect Ratio Container (desktop) */
        .slide-deck {
            position: relative;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
        }

        @media (min-width: 769px) {
            .slide-deck {
                max-width: calc(100vh * 16 / 9);
                max-height: calc(100vw * 9 / 16);
                margin: auto;
                position: absolute;
                inset: 0;
            }
        }

        .slide {
            position: absolute;
            width: 100%; height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 60px;
            opacity: 0;
            visibility: hidden;
            transition: opacity var(--motion-normal);
            background: var(--bg);
            overflow: hidden;
        }

        .slide.active { opacity: 1; visibility: visible; }

        .slide-content {
            width: 100%;
            max-width: 100%;
            max-height: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 16px;
        }

        /* Typography */
        .slide-title {
            font-size: clamp(32px, 6vw, 80px);
            font-weight: 700;
            letter-spacing: -0.02em;
            line-height: 1.05;
            color: var(--fg);
            text-transform: uppercase;
        }

        .slide-title--accent { color: var(--primary); }

        h2 {
            font-size: clamp(20px, 4vw, 40px);
            font-weight: 600;
            color: var(--fg);
        }

        p, li {
            font-size: clamp(14px, 2.5vw, 20px);
            color: var(--fg-secondary);
            line-height: 1.6;
        }

        .eyebrow {
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--primary);
        }

        /* Responsive */
        @media (max-width: 768px) {
            .slide { padding: 32px 24px; }
            .slide-title { font-size: clamp(28px, 5vw, 48px); }
            h2 { font-size: clamp(20px, 4vw, 32px); }
            p, li { font-size: clamp(14px, 2.5vw, 18px); }
        }

        @media (max-width: 480px) {
            .slide { padding: 24px 16px; }
            .slide-title { font-size: clamp(22px, 6vw, 36px); }
            h2 { font-size: clamp(18px, 4.5vw, 28px); }
            .nav-controls { bottom: 16px; gap: 12px; }
            .nav-btn { width: 32px; height: 32px; font-size: 14px; }
        }

        /* Navigation */
        .progress-bar {
            position: fixed;
            top: 0; left: 0;
            height: 3px;
            background: var(--primary);
            transition: width var(--motion-normal);
            z-index: 1000;
        }

        .nav-controls {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            gap: 20px;
            z-index: 1000;
        }

        .nav-btn {
            background: rgba(255,255,255,0.08);
            border: none;
            color: var(--fg);
            width: 40px; height: 40px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            transition: background var(--motion-fast);
        }

        .nav-btn:hover { background: rgba(255,255,255,0.16); }

        .slide-counter {
            color: var(--fg-secondary);
            font-size: 14px;
            font-variant-numeric: tabular-nums;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
            .slide, .progress-bar, .nav-btn { transition: none; }
            .animate-fade-up, .animate-scale, .animate-stagger > * { animation: none; opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="progress-bar" id="progressBar"></div>

    <div class="slide-deck">

        <div class="slide active">
            <div class="slide-content">
                <p class="eyebrow">Company / Context</p>
                <h1 class="slide-title">Title Slide</h1>
                <p>Subtitle or tagline</p>
            </div>
        </div>

        <!-- More slides — always wrap content in .slide-content -->

    </div>

    <div class="nav-controls">
        <button class="nav-btn" onclick="prevSlide()">←</button>
        <span class="slide-counter"><span id="current">1</span> / <span id="total">1</span></span>
        <button class="nav-btn" onclick="nextSlide()">→</button>
    </div>

    <script>
        let current = 1;
        const total = document.querySelectorAll('.slide').length;
        document.getElementById('total').textContent = total;

        function showSlide(n) {
            if (n < 1) n = 1;
            if (n > total) n = total;
            current = n;
            document.querySelectorAll('.slide').forEach((s, i) => {
                s.classList.toggle('active', i === n - 1);
            });
            document.getElementById('current').textContent = n;
            document.getElementById('progressBar').style.width = (n / total * 100) + '%';
        }

        function nextSlide() { showSlide(current + 1); }
        function prevSlide() { showSlide(current - 1); }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextSlide(); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-controls')) nextSlide();
        });

        showSlide(1);
    </script>
</body>
</html>
```

## Chart.js Integration (npm — no CDN)

Install: `pnpm add chart.js`

In a Vite/Next.js project:
```javascript
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
```

For standalone HTML, copy `node_modules/chart.js/dist/chart.umd.min.js` locally:
```html
<script src="./chart.umd.min.js"></script>
```

Chart using headlessengineer tokens:
```html
<div class="chart-container" style="width: min(80%, 600px); height: clamp(200px, 40vh, 350px);">
    <canvas id="chart"></canvas>
</div>

<script>
new Chart(document.getElementById('chart'), {
    type: 'line',
    data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
            label: 'MRR ($K)',
            data: [5, 12, 28, 45],
            borderColor: '#009999',
            backgroundColor: 'rgba(0,153,153,0.1)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: {
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: 'rgba(250,250,250,0.6)', font: { family: 'Inter' } }
            },
            y: {
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: 'rgba(250,250,250,0.6)', font: { family: 'Inter' } }
            }
        }
    }
});
</script>
```

## Animation Classes

```css
.animate-fade-up {
    animation: fadeUp 0.5s ease-out forwards;
    opacity: 0;
}
@keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
}

.animate-scale {
    animation: scaleIn 0.4s ease-out forwards;
    opacity: 0;
}
@keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to   { opacity: 1; transform: scale(1); }
}

.animate-stagger > * {
    opacity: 0;
    animation: fadeUp 0.4s ease-out forwards;
}
.animate-stagger > *:nth-child(1) { animation-delay: 0.08s; }
.animate-stagger > *:nth-child(2) { animation-delay: 0.16s; }
.animate-stagger > *:nth-child(3) { animation-delay: 0.24s; }
.animate-stagger > *:nth-child(4) { animation-delay: 0.32s; }
```

## Background Images (Grayscale / Duotone Only)

Use only grayscale or duotone-treated photographs — see `design-system/references/color.md` imagery rules.

```html
<div class="slide slide-with-bg" style="background-image: url('image.jpg')">
    <div class="overlay" style="background: rgba(10,10,10,0.80);"></div>
    <div class="slide-content" style="position: relative; z-index: 1;">
        <!-- Slide content -->
    </div>
</div>
```

## CSS Variables Reference

| Variable | Value | Usage |
|---|---|---|
| `--bg` | `#0a0a0a` | Slide background |
| `--fg` | `#fafafa` | Primary text |
| `--fg-secondary` | `rgba(250,250,250,0.6)` | Secondary text, labels |
| `--surface` | `#141414` | Cards, elevated surfaces |
| `--primary` | `#009999` | Accent: CTAs, highlights, chart lines, progress bar |
| `--on-primary` | `#ffffff` | Text on `--primary` fills |
