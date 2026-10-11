import { ImageResponse } from 'next/og'

export const alt = 'Qanun — Qatar regulatory library'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#F5F6F7',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: '#8A1538',
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 40,
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontWeight: 600,
              color: '#15181D',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            Qanun
          </span>
          <span
            style={{
              width: 2,
              height: 44,
              background: '#8A1538',
              opacity: 0.4,
              borderRadius: 1,
            }}
          />
          <span
            style={{
              fontSize: 52,
              fontWeight: 600,
              color: '#8A1538',
              lineHeight: 1,
            }}
          >
            قانون
          </span>
        </div>

        {/* Headline */}
        <p
          style={{
            fontSize: 44,
            fontWeight: 600,
            color: '#15181D',
            lineHeight: 1.25,
            margin: 0,
            marginBottom: 20,
            maxWidth: 900,
          }}
        >
          Which Qatar regulations apply to your company?
        </p>

        {/* Tagline */}
        <p
          style={{
            fontSize: 22,
            color: '#5A6270',
            margin: 0,
            fontWeight: 400,
          }}
        >
          Qatar regulatory library · qanun.qa
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
