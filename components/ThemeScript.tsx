import { THEME_STORAGE_KEY } from '../lib/theme-storage-key';

const script = `(function(){
  var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark-mode-preload');
  }
})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
