import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#0a0a0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          border: '1.5px solid #009999',
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontFamily: 'sans-serif',
            fontWeight: 900,
            fontSize: 16,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          H
        </span>
      </div>
    ),
    { ...size }
  );
}
