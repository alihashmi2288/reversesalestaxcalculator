import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Dynamic params
    const title = searchParams.get('title') || 'Reverse Sales Tax Calculator';
    const rate = searchParams.get('rate');
    const location = searchParams.get('location');

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
            backgroundImage: 'radial-gradient(circle at 25% 25%, #1e293b 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1e293b 0%, transparent 50%)',
            padding: '40px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Main Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(30, 41, 59, 0.5)',
              border: '2px solid #334155',
              borderRadius: '24px',
              padding: '60px',
              width: '90%',
              height: '80%',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Logo/Brand */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '40px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#6366f1',
                  borderRadius: '8px',
                  marginRight: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '24px',
                }}
              >
                %
              </div>
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#f8fafc',
                  letterSpacing: '-0.02em',
                }}
              >
                ReverseTaxCalculator
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 900,
                color: '#fff',
                textAlign: 'center',
                marginBottom: '24px',
                lineHeight: 1.1,
                letterSpacing: '-0.04em',
              }}
            >
              {title}
            </h1>

            {/* Stats Row */}
            <div
              style={{
                display: 'flex',
                gap: '32px',
                marginTop: '20px',
              }}
            >
              {location && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '16px 32px',
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '16px',
                  }}
                >
                  <span style={{ color: '#94a3b8', fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>Location</span>
                  <span style={{ color: '#6366f1', fontSize: '32px', fontWeight: 800 }}>{location}</span>
                </div>
              )}
              {rate && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '16px 32px',
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '16px',
                  }}
                >
                  <span style={{ color: '#94a3b8', fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>Avg. Rate</span>
                  <span style={{ color: '#f59e0b', fontSize: '32px', fontWeight: 800 }}>{rate}%</span>
                </div>
              )}
            </div>

            {/* URL Footer */}
            <div
              style={{
                position: 'absolute',
                bottom: '40px',
                fontSize: '20px',
                color: '#475569',
                fontWeight: 600,
              }}
            >
              salestaxreversecalculator.com
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
