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
       style="color:#666; text-decoration:none;">
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
          background: '#111114',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: 'clamp(28px, 4.5vw, 48px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(32px, 4vw, 56px)',
          alignItems: 'center',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 40px rgba(204, 255, 0, 0.02)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle decorative glow */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '380px',
            height: '380px',
            background: 'radial-gradient(circle, rgba(204, 255, 0, 0.05) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
            borderRadius: '50%',
          }}
        />

        {/* ── Left Column: Information & Action ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', zIndex: 1 }}>
          {/* Eyebrow Label */}
          <span
            style={{
              color: 'var(--primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '16px',
              display: 'inline-block',
            }}
          >
            Free Widget Integration
          </span>

          {/* Heading */}
          <h2
            style={{
              color: '#ffffff',
              fontSize: 'clamp(28px, 3.8vw, 42px)',
              fontWeight: 800,
              lineHeight: 1.15,
              margin: '0 0 20px',
              letterSpacing: '-0.02em',
              textTransform: 'none',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Embed Reverse Tax Calculator on your site.
          </h2>

          {/* Description Paragraph */}
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '15px',
              lineHeight: 1.65,
              margin: '0 0 32px',
              maxWidth: '480px',
            }}
          >
            Add value to your e-commerce platform, invoice portal, or affiliate blog by embedding our responsive, unbranded reverse sales tax calculator widget. Installs in minutes.
          </p>

          {/* Copy Embed Code Pill Button */}
          <button
            id="embed-section-copy-btn"
            onClick={copyEmbedCode}
            aria-label="Copy embed widget HTML snippet"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '14px 32px',
              borderRadius: '9999px',
              background: '#ffffff',
              color: '#09090b',
              border: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 4px 20px rgba(255, 255, 255, 0.15)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.background = '#f4f4f5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.background = '#ffffff';
            }}
          >
            {copied ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span style={{ color: '#16a34a' }}>Copied to Clipboard!</span>
              </>
            ) : (
              'Copy Embed Code'
            )}
          </button>
        </div>

        {/* ── Right Column: Widget Preview Card ── */}
        <div style={{ width: '100%', zIndex: 1 }}>
          <div
            style={{
              background: '#070709',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              borderRadius: '18px',
              padding: '22px 24px',
              boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.8), 0 10px 30px rgba(0, 0, 0, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Top Indicator Header: Dot + Label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  boxShadow: '0 0 8px rgba(255, 255, 255, 0.9)',
                }}
              />
              <span
                style={{
                  color: '#f4f4f5',
                  fontSize: '13px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.01em',
                }}
              >
                Reverse Sales Tax Widget Preview
              </span>
            </div>

            {/* Widget Inner Mockup Container */}
            <div
              style={{
                background: '#000000',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)',
              }}
            >
              {/* Widget Header: Icon + Title + Free Tool */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '6px',
                      background: 'rgba(204, 255, 0, 0.12)',
                      border: '1px solid rgba(204, 255, 0, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary)',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="4" y="2" width="16" height="20" rx="2" />
                      <path d="M9 7h6M9 12h6M9 17h4" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: '#ffffff',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    Reverse Sales Tax Calculator
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                  }}
                >
                  Free Tool
                </span>
              </div>

              {/* 2-Column Inputs Mockup: Total Paid + Tax Rate */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                {/* Total Paid Field */}
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '6px',
                      color: '#f4f4f5',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    Total Paid (with tax)
                  </div>
                  <div
                    style={{
                      height: '42px',
                      background: '#0a0a0c',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 12px',
                      gap: '8px',
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--primary)',
                        fontWeight: 700,
                        fontSize: '14px',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      $
                    </span>
                    <span
                      style={{
                        color: 'var(--primary)',
                        fontWeight: 700,
                        fontSize: '14px',
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      107.50
                    </span>
                  </div>
                </div>

                {/* Tax Rate Field */}
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '6px',
                      color: '#f4f4f5',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    Tax Rate
                  </div>
                  <div
                    style={{
                      height: '42px',
                      background: '#0a0a0c',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 12px',
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--primary)',
                        fontWeight: 700,
                        fontSize: '14px',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      8.25
                    </span>
                    <span
                      style={{
                        color: 'var(--text-secondary)',
                        fontWeight: 700,
                        fontSize: '13px',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      %
                    </span>
                  </div>
                </div>
              </div>

              {/* State Dropdown Mockup */}
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: '10px',
                    marginBottom: '6px',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  Or Select US State (auto-fills rate)
                </div>
                <div
                  style={{
                    height: '42px',
                    background: '#0a0a0c',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 14px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: '#e4e4e7',
                    fontWeight: 600,
                  }}
                >
                  <span>— Select a State —</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>

              {/* Calculate Button Mockup */}
              <div
                style={{
                  height: '44px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                  color: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  boxShadow: '0 4px 15px rgba(204, 255, 0, 0.25)',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <path d="M9 7h6M9 12h6M9 17h4" />
                </svg>
                Calculate Pre-Tax Price
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
