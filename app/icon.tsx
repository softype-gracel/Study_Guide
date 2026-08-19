import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Shadow strip — simulates boxShadow: 0 3px 0 #2E2A25 */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '2px',
            right: '2px',
            height: '5px',
            background: '#2E2A25',
            borderRadius: '0 0 22% 22%',
          }}
        />

        {/* Main icon tile */}
        <div
          style={{
            width: '100%',
            height: '29px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FFD447',
            borderRadius: '22%',
            border: '2.5px solid #2E2A25',
            position: 'relative',
          }}
        >
          {/* Pin head */}
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#FF6F91',
              border: '2px solid #2E2A25',
              position: 'absolute',
              top: 4,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
          {/* Pin shaft */}
          <div
            style={{
              width: 2.5,
              height: 10,
              background: '#2E2A25',
              borderRadius: 2,
              position: 'absolute',
              top: 12,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  )
}
