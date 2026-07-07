import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          gap: '32px',
        }}
      >
        {/* Two-tone wordmark: HEADLESS (white) + ENGINEER (teal) */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 0 }}>
          <span
            style={{
              color: '#ffffff',
              fontFamily: 'Bitcount',
              fontSize: 72,
              fontWeight: 400,
              letterSpacing: '0.04em',
            }}
          >
            HEADLESS
          </span>
          <span
            style={{
              color: '#009999',
              fontFamily: 'Bitcount',
              fontSize: 72,
              fontWeight: 400,
              letterSpacing: '0.04em',
            }}
          >
            ENGINEER
          </span>
        </div>

        {/* Accent rule - the one accent element */}
        <div style={{ width: 48, height: 3, background: '#009999' }} />

        {/* Value proposition */}
        <div
          style={{
            color: '#ffffff',
            fontFamily: 'sans-serif',
            fontSize: 36,
            fontWeight: 700,
            lineHeight: 1.2,
            maxWidth: 760,
          }}
        >
          Tech solutions for business problems.
        </div>

        {/* URL - muted */}
        <div
          style={{
            color: '#4d4d4d',
            fontFamily: 'sans-serif',
            fontSize: 20,
            fontWeight: 400,
            marginTop: 8,
          }}
        >
          headlessengineer.xyz
        </div>
      </div>
    ),
    { ...size }
  );
}
