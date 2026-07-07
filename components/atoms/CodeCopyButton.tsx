'use client';

import { useState } from 'react';
import styles from './CodeCopyButton.module.css';

interface CodeCopyButtonProps {
  code: string;
}

export function CodeCopyButton({ code }: CodeCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access denied or unavailable - fail silently in browser without feedback.
    }
  }

  return (
    <button onClick={handleCopy} className={styles.button} aria-label="Copy code to clipboard">
      {copied ? '[COPIED]' : '[COPY]'}
    </button>
  );
}
