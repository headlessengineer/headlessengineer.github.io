'use client';

import { useEffect } from 'react';
import styles from './GlobalError.module.css';
import './styles/globals.css';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className={styles.body}>
        <h1 className={styles.heading}>Fatal Error</h1>
        <p className={styles.message}>{error.message}</p>
        <button onClick={reset} className={styles.button}>
          Try again
        </button>
      </body>
    </html>
  );
}
