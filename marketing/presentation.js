/**
 * presentation.js — shared runtime for headlessengineer HTML presentations
 *
 * Include once per deck: <script src="./presentation.js"></script>
 * Reads .slide elements from the DOM. Injects offcanvas navigator.
 *
 * Keyboard shortcuts
 *   ← / →  / Space   navigate slides   (presentation mode only)
 *   T                toggle light / dark theme
 *   P                toggle presentation / scroll mode
 *   O                toggle offcanvas slide navigator
 *   Escape           close offcanvas
 */
(function () {
  'use strict';

  /* ── State ──────────────────────────────────────────────────────────── */
  let current        = 1;
  let isScrollMode   = false;
  let isOffcanvasOpen = false;

  const slides = () => Array.from(document.querySelectorAll('.slide'));

  /* ── Theme ──────────────────────────────────────────────────────────── */
  const THEME_KEY = 'he-presentation-theme';

  function getInitialTheme() {
    return localStorage.getItem(THEME_KEY) || 'dark'; // presentations default dark
  }

  function applyTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem(THEME_KEY, theme);
    syncThemeIcon(theme);
  }

  function toggleTheme() {
    applyTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark');
  }

  function syncThemeIcon(theme) {
    const btn = document.getElementById('ocThemeBtn');
    if (!btn) return;
    const isDark = theme === 'dark';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.querySelector('svg').innerHTML = isDark
      ? '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/>'
      : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  }

  /* ── Navigation ─────────────────────────────────────────────────────── */
  function showSlide(n) {
    if (isScrollMode) return;
    const all = slides();
    const clamped = Math.max(1, Math.min(n, all.length));
    current = clamped;
    all.forEach((s, i) => s.classList.toggle('active', i === clamped - 1));
    updateProgress();
    syncOffcanvasActive();
  }

  const nextSlide = () => showSlide(current + 1);
  const prevSlide = () => showSlide(current - 1);

  /* ── Progress bar ───────────────────────────────────────────────────── */
  function updateProgress() {
    const bar = document.getElementById('progressBar');
    if (!bar) return;
    if (isScrollMode) {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (height > 0 ? (scrolled / height) * 100 : 0) + '%';
    } else {
      const all = slides();
      bar.style.width = all.length ? (current / all.length * 100) + '%' : '0%';
    }
  }

  /* ── Scroll mode ────────────────────────────────────────────────────── */
  function toggleScrollMode() {
    isScrollMode = !isScrollMode;
    document.body.classList.toggle('scroll-mode', isScrollMode);

    if (isScrollMode) {
      // Snap to the slide that was active
      const target = slides()[current - 1];
      if (target) target.scrollIntoView({ behavior: 'instant' });
    } else {
      // Re-activate current slide in presentation mode
      showSlide(current);
    }
    syncModeIcon();
    updateProgress();
  }

  function syncModeIcon() {
    const btn = document.getElementById('ocModeBtn');
    if (!btn) return;
    if (isScrollMode) {
      btn.setAttribute('aria-label', 'Switch to presentation mode');
      btn.title = 'Presentation mode (P)';
      btn.querySelector('svg').innerHTML = '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/>';
    } else {
      btn.setAttribute('aria-label', 'Switch to scroll mode');
      btn.title = 'Scroll mode (P)';
      btn.querySelector('svg').innerHTML = '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18"/>';
    }
  }

  /* ── Offcanvas ──────────────────────────────────────────────────────── */
  function buildOffcanvas() {
    if (document.getElementById('offcanvasPanel')) return;

    // Backdrop
    const backdrop = document.createElement('div');
    backdrop.id = 'offcanvasBackdrop';
    backdrop.className = 'oc-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    backdrop.addEventListener('click', closeOffcanvas);

    // Panel
    const panel = document.createElement('aside');
    panel.id = 'offcanvasPanel';
    panel.className = 'oc-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Slide navigator');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-hidden', 'true');

    panel.innerHTML = `
      <div class="oc-header">
        <span class="oc-wordmark" aria-label="HeadlessEngineer">
          <span class="oc-wm-head">HEADLESS</span><span class="oc-wm-eng">ENGINEER</span>
        </span>
        <div class="oc-header-actions">
          <button class="oc-icon-btn" id="ocThemeBtn" title="Theme (T)">
            <svg viewBox="0 0 24 24" aria-hidden="true"></svg>
          </button>
          <button class="oc-icon-btn" id="ocModeBtn" title="Mode (P)">
            <svg viewBox="0 0 24 24" aria-hidden="true"></svg>
          </button>
          <button class="oc-icon-btn" id="ocClose" aria-label="Close navigator">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
      <nav class="oc-nav" aria-label="Slides">
        <ol class="oc-slide-list" id="ocSlideList"></ol>
      </nav>
      <footer class="oc-footer">
        <span class="oc-hint">← → navigate &nbsp;·&nbsp; T theme &nbsp;·&nbsp; P mode &nbsp;·&nbsp; O menu</span>
      </footer>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(panel);

    document.getElementById('ocClose').addEventListener('click', closeOffcanvas);
    document.getElementById('ocThemeBtn').addEventListener('click', () => { toggleTheme(); });
    document.getElementById('ocModeBtn').addEventListener('click', () => { toggleScrollMode(); });

    populateSlideList();
  }

  function populateSlideList() {
    const list = document.getElementById('ocSlideList');
    if (!list) return;
    list.innerHTML = '';
    slides().forEach((slide, i) => {
      const title   = slide.dataset.slideTitle   || `Slide ${i + 1}`;
      const section = slide.dataset.slideSection || '';
      const n       = i + 1;

      const li  = document.createElement('li');
      li.className = 'oc-slide-item';

      const btn = document.createElement('button');
      btn.className = `oc-slide-btn${i === current - 1 ? ' oc-slide-active' : ''}`;
      btn.setAttribute('aria-label', `Go to slide ${n}: ${title}`);
      btn.dataset.n = n;
      btn.innerHTML = `
        <span class="oc-slide-num">${String(n).padStart(2, '0')}</span>
        <span class="oc-slide-info">
          ${section ? `<span class="oc-slide-section">${section}</span>` : ''}
          <span class="oc-slide-title-text">${title}</span>
        </span>
      `;
      btn.addEventListener('click', () => {
        if (isScrollMode) {
          slides()[n - 1]?.scrollIntoView({ behavior: 'smooth' });
        } else {
          showSlide(n);
        }
        closeOffcanvas();
      });

      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  function syncOffcanvasActive() {
    document.querySelectorAll('.oc-slide-btn').forEach((btn, i) => {
      btn.classList.toggle('oc-slide-active', i === current - 1);
    });
  }

  function openOffcanvas() {
    isOffcanvasOpen = true;
    const panel    = document.getElementById('offcanvasPanel');
    const backdrop = document.getElementById('offcanvasBackdrop');
    panel?.classList.add('oc-panel--open');
    panel?.setAttribute('aria-hidden', 'false');
    backdrop?.classList.add('oc-backdrop--open');
    document.body.classList.add('oc-open');
    // Defer focus so the transition is visible before focus lands
    setTimeout(() => document.getElementById('ocClose')?.focus(), 50);
  }

  function closeOffcanvas() {
    isOffcanvasOpen = false;
    const panel    = document.getElementById('offcanvasPanel');
    const backdrop = document.getElementById('offcanvasBackdrop');
    panel?.classList.remove('oc-panel--open');
    panel?.setAttribute('aria-hidden', 'true');
    backdrop?.classList.remove('oc-backdrop--open');
    document.body.classList.remove('oc-open');
  }

  const toggleOffcanvas = () => (isOffcanvasOpen ? closeOffcanvas() : openOffcanvas());

  /* ── Scroll tracking (scroll mode) ─────────────────────────────────── */
  function handleScroll() {
    if (!isScrollMode) return;
    updateProgress();
    // Track which slide is in view (whichever top edge has most recently passed midpoint)
    const mid = window.scrollY + window.innerHeight * 0.4;
    let active = 0;
    slides().forEach((s, i) => {
      if (s.getBoundingClientRect().top + window.scrollY <= mid) active = i;
    });
    current = active + 1;
    syncOffcanvasActive();
  }

  /* ── Keyboard ───────────────────────────────────────────────────────── */
  function handleKeyDown(e) {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

    switch (e.key) {
      case 'ArrowRight':
      case ' ':
        if (!isScrollMode && !isOffcanvasOpen) { e.preventDefault(); nextSlide(); }
        break;
      case 'ArrowLeft':
        if (!isScrollMode && !isOffcanvasOpen) { e.preventDefault(); prevSlide(); }
        break;
      case 't': case 'T':
        toggleTheme();
        break;
      case 'p': case 'P':
        toggleScrollMode();
        break;
      case 'o': case 'O':
        toggleOffcanvas();
        break;
      case 'Escape':
        if (isOffcanvasOpen) closeOffcanvas();
        break;
    }
  }

  /* ── Click to advance (presentation mode) ──────────────────────────── */
  function handleClick(e) {
    if (isScrollMode) return;
    if (e.target.closest('#offcanvasPanel, #offcanvasBackdrop, a, button')) return;
    nextSlide();
  }

  /* ── Init ───────────────────────────────────────────────────────────── */
  function init() {
    buildOffcanvas();
    applyTheme(getInitialTheme());
    showSlide(1);
    syncModeIcon();

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
