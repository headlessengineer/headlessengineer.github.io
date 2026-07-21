import { ImageResponse } from 'next/og';
import { BRAND_COLORS } from '@/config/theme';

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
          background: BRAND_COLORS.bgDark,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          border: `1.5px solid ${BRAND_COLORS.accent}`,
        }}
      >
        <span
          style={{
            color: BRAND_COLORS.white,
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
