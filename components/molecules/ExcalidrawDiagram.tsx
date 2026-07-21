'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import type { ImportedDataState } from '@excalidraw/excalidraw/data/types';
import { useTheme } from '../../context/ThemeContext';

interface DiagramInitialData {
  elements?: readonly Record<string, unknown>[];
  appState?: Record<string, unknown>;
  files?: Record<string, unknown> | null;
}

// Dynamically import Excalidraw since it relies on window/document and cannot be SSR'd.
const Excalidraw = dynamic(
  () => import('@excalidraw/excalidraw').then((mod) => mod.Excalidraw),
  {
    ssr: false,
    loading: () => (
      <div style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading diagram...
      </div>
    ),
  }
);

interface ExcalidrawDiagramProps {
  data: string;
}

export function ExcalidrawDiagram({ data }: ExcalidrawDiagramProps) {
  const { theme } = useTheme();

  const initialData = useMemo<DiagramInitialData>(() => {
    try {
      const parsed = JSON.parse(data);
      // Ensure we have the minimum required structure
      return {
        elements: parsed.elements || [],
        appState: {
          ...parsed.appState,
          viewBackgroundColor: parsed.appState?.viewBackgroundColor || 'transparent',
        },
        files: parsed.files || null,
      };
    } catch (e) {
      console.error('Failed to parse Excalidraw data:', e);
      return { elements: [] };
    }
  }, [data]);

  return (
    <div style={{ height: '500px', width: '100%', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
      <Excalidraw
        initialData={initialData as unknown as ImportedDataState}
        theme={theme}
        viewModeEnabled={true} // Read-only mode for articles
      />
    </div>
  );
}
