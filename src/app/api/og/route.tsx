import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Dynamic query parameters
    const title = searchParams.get('title') || 'Reverse Sales Tax Calculator';
    const rate = searchParams.get('rate');
    const location = searchParams.get('location');

    // Dynamically adjust title size if text is long
    const isLongTitle = title.length > 45;
    const titleFontSize = isLongTitle ? '44px' : '52px';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(145deg, #00482f 0%, #006642 45%, #008254 100%)',
            padding: '48px',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            position: 'relative',
          }}
        >
          {/* Subtle Corner Background Radial Glows */}
          <div
            style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '450px',
              height: '450px',
              borderRadius: '9999px',
              background: 'radial-gradient(circle, rgba(154, 230, 0, 0.18) 0%, transparent 70%)',
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-120px',
              left: '-120px',
              width: '450px',
              height: '450px',
              borderRadius: '9999px',
              background: 'radial-gradient(circle, rgba(183, 236, 218, 0.15) 0%, transparent 70%)',
              display: 'flex',
            }}
          />

          {/* Main Card Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0, 48, 31, 0.55)',
              border: '1.5px solid rgba(183, 236, 218, 0.25)',
              borderRadius: '16px',
              padding: '44px 48px',
            }}
          >
            {/* 1. Header Row: Logo & Trust Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              {/* Brand Logo & Wordmark */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {/* SVG Brand Calculator Icon */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    backgroundColor: '#008254',
                    border: '1.5px solid #00a36a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Top-Right Lime Accent Corner */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '14px',
                      height: '14px',
                      backgroundColor: '#8dc63f',
                      display: 'flex',
                    }}
                  />
                  {/* White Calculator Housing */}
                  <div
                    style={{
                      width: '30px',
                      height: '34px',
                      border: '2px solid #ffffff',
                      borderRadius: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '3px',
                      justifyContent: 'space-between',
                    }}
                  >
                    {/* Mint LCD Screen */}
                    <div
                      style={{
                        width: '20px',
                        height: '7px',
                        backgroundColor: '#effcf8',
                        borderRadius: '2px',
                        display: 'flex',
                      }}
                    />
                    {/* Keys Grid */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        width: '20px',
                        justifyContent: 'space-between',
                        gap: '2px',
                      }}
                    >
                      <div style={{ width: '8px', height: '6px', backgroundColor: '#ffffff', borderRadius: '1px' }} />
                      <div style={{ width: '8px', height: '6px', backgroundColor: '#ffffff', borderRadius: '1px' }} />
                      <div style={{ width: '8px', height: '6px', backgroundColor: '#ffffff', borderRadius: '1px' }} />
                      <div style={{ width: '8px', height: '6px', backgroundColor: '#8dc63f', borderRadius: '1px' }} />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontSize: '28px',
                      fontWeight: 800,
                      color: '#ffffff',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                    }}
                  >
                    PreTaxPrice
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#e8fdac',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginTop: '2px',
                    }}
                  >
                    Reverse Sales Tax Calculator
                  </span>
                </div>
              </div>

              {/* Verified Editorial Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#e8fdac',
                  color: '#00482f',
                  padding: '8px 18px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                ✓ 2026 Tax Rates Verified
              </div>
            </div>

            {/* 2. Middle Content: Eyebrow + Dynamic Title + Description */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '16px 0',
              }}
            >
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#9ae600',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                Instant Pre-Tax Price & Sales Tax Breakdown
              </span>
              <h1
                style={{
                  fontSize: titleFontSize,
                  fontWeight: 900,
                  color: '#ffffff',
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  margin: 0,
                  marginBottom: '12px',
                  display: 'flex',
                  maxWidth: '1020px',
                }}
              >
                {title}
              </h1>
              <p
                style={{
                  fontSize: '19px',
                  color: '#effcf8',
                  lineHeight: 1.4,
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                Calculate original before-tax price from any checkout receipt or invoice total.
              </p>
            </div>

            {/* 3. Stats Row (Location, Rate, Algebra Formula) */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
              }}
            >
              {location && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '12px 24px',
                    backgroundColor: 'rgba(0, 102, 66, 0.65)',
                    border: '1.5px solid rgba(183, 236, 218, 0.35)',
                    borderRadius: '8px',
                  }}
                >
                  <span
                    style={{
                      color: '#b7ecda',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}
                  >
                    Jurisdiction
                  </span>
                  <span
                    style={{
                      color: '#ffffff',
                      fontSize: '24px',
                      fontWeight: 800,
                    }}
                  >
                    {location}
                  </span>
                </div>
              )}

              {rate && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '12px 24px',
                    backgroundColor: 'rgba(0, 102, 66, 0.65)',
                    border: '1.5px solid rgba(183, 236, 218, 0.35)',
                    borderRadius: '8px',
                  }}
                >
                  <span
                    style={{
                      color: '#b7ecda',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}
                  >
                    Tax Rate
                  </span>
                  <span
                    style={{
                      color: '#9ae600',
                      fontSize: '24px',
                      fontWeight: 900,
                    }}
                  >
                    {rate}%
                  </span>
                </div>
              )}

              {/* Exact Formula Block */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '12px 24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                }}
              >
                <span
                  style={{
                    color: '#b7ecda',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}
                >
                  Exact Formula
                </span>
                <span
                  style={{
                    color: '#effcf8',
                    fontSize: '19px',
                    fontWeight: 700,
                    fontFamily: 'monospace',
                  }}
                >
                  PreTax = Total ÷ (1 + r)
                </span>
              </div>
            </div>

            {/* 4. Footer Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid rgba(183, 236, 218, 0.2)',
                paddingTop: '16px',
                marginTop: '12px',
              }}
            >
              <span
                style={{
                  fontSize: '16px',
                  color: '#e8fdac',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                }}
              >
                salestaxreversecalculator.com
              </span>
              <span
                style={{
                  fontSize: '13px',
                  color: '#b7ecda',
                  fontWeight: 500,
                }}
              >
                All 50 US States • Canada GST/HST/PST • International VAT
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    console.error('OG Image Generation Error:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}

