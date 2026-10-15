'use client';

import { useState } from 'react';

const EMBED_SNIPPET = `<div style="max-width:500px;">
  <iframe
    src="https://salestaxreversecalculator.com/embed"
    width="100%"
    height="420"
    frameborder="0"
    loading="lazy"
    title="Reverse Sales Tax Calculator">
  </iframe>
  <div style="text-align:center; font-size:11px; margin-top:4px; font-family:sans-serif;">
    <a href="https://salestaxreversecalculator.com?utm_source=embed&utm_medium=widget"
       rel="nofollow sponsored"
       target="_blank"
       style="color:#008254; text-decoration:none;">
      Powered by PreTaxPrice
    </a>
  </div>
</div>`;

export default function EmbedWidgetSection() {
  const [copied, setCopied] = useState(false);

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(EMBED_SNIPPET).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section
      id="embed-widget-section"
      style={{
        width: '100%',
        maxWidth: 1120,
        margin: '40px auto 56px',
        padding: '0 20px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--mint-50)',
          border: '1px solid var(--mint-200)',
          borderRadius: 'var(--radius-xxxl)',
          padding: 'clamp(28px, 4vw, 44px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(32px, 4vw, 48px)',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Left Column: Information & Action */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span className="section-label">
            Free Widget Integration
          </span>

          <h2
            style={{
              color: 'var(--ink)',
              fontSize: 'clamp(24px, 3.5vw, 36px)',
              fontWeight: 700,
              lineHeight: 1.2,
              margin: '0 0 16px',
              letterSpacing: '-0.02em',
            }}
          >
            Embed the Reverse Tax Calculator on Your Website
          </h2>

          <p
            style={{
              color: 'var(--body)',
              fontSize: '15px',
              lineHeight: 1.6,
              margin: '0 0 28px',
              maxWidth: '480px',
            }}
          >
            Add instant value to your invoicing tool, e-commerce checkout guide, or accounting blog. Embed our lightweight, responsive reverse sales tax utility with zero setup friction.
          </p>

          <button
            id="embed-section-copy-btn"
            onClick={copyEmbedCode}
            aria-label="Copy Embed Code - Embed widget HTML snippet"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px 28px',
              borderRadius: 'var(--radius-xs)',
              backgroundColor: 'var(--primary)',
              color: 'var(--on-primary)',
              border: 'none',
              fontFamily: 'var(--font-montserrat), sans-serif',
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-deep)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
          >
            {copied ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              'Copy Embed Code'
            )}
          </button>
        </div>

        {/* Right Column: Widget Preview Card */}
        <div style={{ width: '100%' }}>
          <div
            style={{
              backgroundColor: 'var(--canvas)',
              border: '1px solid var(--hairline-strong)',
              borderRadius: 'var(--radius-lg)',
              padding: '22px 24px',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                }}
              />
              <span
                style={{
                  color: 'var(--ink)',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                }}
              >
                Reverse Sales Tax Widget Preview
              </span>
            </div>

            <div
              style={{
                backgroundColor: 'var(--canvas-soft)',
                border: '1px solid var(--hairline-strong)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--hairline)',
                  paddingBottom: '10px',
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: 'var(--ink)',
                  }}
                >
                  Reverse Sales Tax Calculator
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--muted)',
                    fontWeight: 600,
                  }}
                >
                  Free Utility
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '6px',
                      color: 'var(--ink)',
                    }}
                  >
                    Total Paid (with tax)
                  </div>
                  <div
                    style={{
                      height: '40px',
                      backgroundColor: 'var(--canvas)',
                      border: '1px solid var(--hairline-strong)',
                      borderRadius: 'var(--radius-xs)',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 10px',
                      gap: '6px',
                    }}
                  >
                    <span style={{ color: 'var(--muted)', fontWeight: 600, fontSize: '13px', fontFamily: 'var(--font-mono)' }}>$</span>
                    <span style={{ color: 'var(--ink)', fontWeight: 700, fontSize: '13px', fontFamily: 'var(--font-mono)' }}>107.50</span>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '6px',
                      color: 'var(--ink)',
                    }}
                  >
                    Tax Rate
                  </div>
                  <div
                    style={{
                      height: '40px',
                      backgroundColor: 'var(--canvas)',
                      border: '1px solid var(--hairline-strong)',
                      borderRadius: 'var(--radius-xs)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 10px',
                    }}
                  >
                    <span style={{ color: 'var(--ink)', fontWeight: 700, fontSize: '13px', fontFamily: 'var(--font-mono)' }}>8.25</span>
                    <span style={{ color: 'var(--muted)', fontWeight: 600, fontSize: '13px', fontFamily: 'var(--font-mono)' }}>%</span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  height: '42px',
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: 'var(--primary)',
                  color: 'var(--on-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Calculate Pre-Tax Price
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
