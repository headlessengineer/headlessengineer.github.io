'use client';
import { useState, useEffect } from 'react';

export function useTypingAnimation(
  text: string,
  intervalMs = 28,
): { visibleText: string; isComplete: boolean } {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index >= text.length) return;
    const id = setTimeout(() => setIndex((i) => i + 1), intervalMs);
    return () => clearTimeout(id);
  }, [index, text.length, intervalMs]);

  return { visibleText: text.slice(0, index), isComplete: index >= text.length };
}
