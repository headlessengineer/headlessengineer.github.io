'use client';

import { useEffect, useRef } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { marked } from 'marked';
import { CodeCopyButton } from '../atoms/CodeCopyButton';
import { ExcalidrawDiagram } from './ExcalidrawDiagram';
import { palettes } from '../../theme-palette';
import styles from './ArticleContent.module.css';

// Escape raw HTML blocks in markdown - prevents script/attribute injection from content files.
marked.use({
  renderer: {
    html({ text }: { text: string }): string {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    },
  },
});

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  const html = marked.parse(content) as string;
  const contentRef = useRef<HTMLDivElement>(null);
  const rootsRef = useRef<Root[]>([]);

  useEffect(() => {
    if (!contentRef.current) return;
    let cancelled = false;

    const initContent = async () => {
      const mermaidBlocks = contentRef.current!.querySelectorAll('pre code.language-mermaid');
      const excalidrawBlocks = contentRef.current!.querySelectorAll('pre code.language-excalidraw');

      if (mermaidBlocks.length > 0) {
        const mermaid = (await import('mermaid')).default;
        if (cancelled) return;
        const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        const colors = palettes[currentTheme] ?? palettes.dark;

        mermaid.initialize({
          startOnLoad: false,
          theme: currentTheme === 'light' ? 'default' : 'dark',
          themeVariables: {
            primaryColor: colors.accent,
            primaryTextColor: colors.foreground,
            primaryBorderColor: colors.accent,
            lineColor: colors.accent,
            secondaryColor: colors.background,
            tertiaryColor: colors.tertiary,
            background: colors.background,
            mainBkg: colors.background,
            textColor: colors.foreground,
            fontSize: '14px',
            fontFamily: 'monospace',
          },
        });

        const mermaidData: { div: HTMLElement; code: string }[] = [];
        mermaidBlocks.forEach((block) => {
          const code = block.textContent || '';
          const pre = block.parentElement;
          if (pre) {
            const div = document.createElement('div');
            div.className = 'mermaid';
            div.textContent = code;
            pre.replaceWith(div);
            mermaidData.push({ div, code });
          }
        });

        await mermaid.run();
        if (cancelled) return;

        mermaidData.forEach(({ div, code }) => {
          div.style.position = 'relative';
          const btn = document.createElement('div');
          btn.setAttribute('data-copy-button', 'true');
          div.appendChild(btn);
          const root = createRoot(btn);
          rootsRef.current.push(root);
          root.render(<CodeCopyButton code={code} />);
        });
      }

      if (cancelled) return;

      if (excalidrawBlocks.length > 0) {
        excalidrawBlocks.forEach((block) => {
          const code = block.textContent || '';
          const pre = block.parentElement;
          if (pre) {
            const div = document.createElement('div');
            div.className = 'excalidraw-wrapper';
            div.style.position = 'relative';
            div.style.margin = '2rem 0';
            pre.replaceWith(div);
            
            const root = createRoot(div);
            rootsRef.current.push(root);
            root.render(<ExcalidrawDiagram data={code} />);
          }
        });
      }

      if (cancelled) return;

      // Add chrome (dots header + copy button) to all remaining code blocks
      const codeBlocks = contentRef.current!.querySelectorAll('pre > code');
      codeBlocks.forEach((codeBlock) => {
        const pre = codeBlock.parentElement;
        if (!pre || pre.querySelector('[data-copy-button]')) return;
        pre.style.position = 'relative';

        const header = document.createElement('div');
        header.setAttribute('data-code-header', 'true');
        for (let i = 0; i < 3; i++) {
          const dot = document.createElement('span');
          dot.setAttribute('data-code-dot', 'true');
          header.appendChild(dot);
        }
        pre.insertBefore(header, pre.firstChild);

        const code = codeBlock.textContent || '';
        const btn = document.createElement('div');
        btn.setAttribute('data-copy-button', 'true');
        pre.appendChild(btn);
        const root = createRoot(btn);
        rootsRef.current.push(root);
        root.render(<CodeCopyButton code={code} />);
      });
    };

    initContent();

    return () => {
      cancelled = true;
      const roots = rootsRef.current;
      rootsRef.current = [];
      setTimeout(() => roots.forEach((root) => root.unmount()), 0);
    };
  }, [html]);

  return (
    <div
      ref={contentRef}
      className={styles.content}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
