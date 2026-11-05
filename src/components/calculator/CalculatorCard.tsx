'use client';
import { useState, useCallback } from 'react';
import BasicTab from './BasicTab';
import MultipleItemsTab from './MultipleItemsTab';
import FindTaxRateTab from './FindTaxRateTab';
import BatchModeTab from './BatchModeTab';

export interface CalculatorCardProps {
  initialMode?: 'reverse' | 'forward';
  defaultAmount?: string;
  defaultRate?: string;
}

export default function CalculatorCard({
  initialMode = 'reverse',
  defaultAmount,
  defaultRate,
}: CalculatorCardProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'multiple' | 'find-rate' | 'batch'>('basic');
  const [calcMode, setCalcMode] = useState<'reverse' | 'forward'>(initialMode);

  // Smooth scroll to top of calculator card (compensating for the 70px sticky navbar)
  const scrollToCalculator = useCallback(() => {
    if (typeof window === 'undefined') return;
    const cardEl = document.getElementById('calculator-card');
    if (cardEl) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const yOffset = -85;
      const y = cardEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: prefersReduced ? 'auto' : 'smooth' });
    }
  }, []);

  const handleModeKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setCalcMode('forward');
      document.getElementById('mode-btn-forward')?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setCalcMode('reverse');
      document.getElementById('mode-btn-reverse')?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setCalcMode('reverse');
      document.getElementById('mode-btn-reverse')?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      setCalcMode('forward');
      document.getElementById('mode-btn-forward')?.focus();
    }
  };

  const handleTabChange = useCallback((tabId: 'basic' | 'multiple' | 'find-rate' | 'batch') => {
    setActiveTab(tabId);
    // Smoothly scroll to the calculator screen so the user doesn't stay at the bottom
    setTimeout(() => {
      scrollToCalculator();
    }, 20);
  }, [scrollToCalculator]);

  const switchTab = useCallback((tabId: string) => {
    if (tabId === 'basic' || tabId === 'multiple' || tabId === 'find-rate' || tabId === 'batch') {
      handleTabChange(tabId);
    }
  }, [handleTabChange]);

  return (
    <div style={{ maxWidth: activeTab === 'multiple' ? 840 : 600, margin: '0 auto', transition: 'max-width 0.2s ease' }}>
      <div id="calculator-card" className="calc-card" style={{ minHeight: 460, maxWidth: '100%' }}>
        {/* ── Return Link for Secondary Tools ── */}
        {activeTab !== 'basic' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 16,
              paddingBottom: 12,
              borderBottom: '1px solid var(--hairline-strong)',
            }}
          >
            <button
              type="button"
              onClick={() => handleTabChange('basic')}
              className="btn-secondary"
              style={{
                color: 'var(--primary-deep)',
                fontWeight: 700,
                fontSize: 13,
                gap: 6,
                padding: '8px 14px',
                minHeight: 40,
                display: 'inline-flex',
                alignItems: 'center',
                borderColor: 'var(--primary)',
                backgroundColor: 'var(--mint-50)',
              }}
            >
              <span aria-hidden="true">←</span>
              <span>Back to standard calculator</span>
            </button>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)' }}>
              {activeTab === 'multiple' && 'Multiple Items Calculator'}
              {activeTab === 'find-rate' && 'Find Tax Rate Tool'}
              {activeTab === 'batch' && 'Batch CSV Mode'}
            </span>
          </div>
        )}

        {/* ── Segmented Mode Toggle (Only shown in standard calculator mode) ── */}
        {activeTab === 'basic' && (
          <div
            role="radiogroup"
            aria-label="Calculator mode"
            className="mode-segmented-control"
            onKeyDown={handleModeKeyDown}
          >
            <button
              type="button"
              id="mode-btn-reverse"
              role="radio"
              aria-checked={calcMode === 'reverse'}
              tabIndex={calcMode === 'reverse' ? 0 : -1}
              onClick={() => setCalcMode('reverse')}
              className={`mode-segment-btn ${calcMode === 'reverse' ? 'active' : ''}`}
            >
              <span>Find price before tax</span>
            </button>

            <button
              type="button"
              id="mode-btn-forward"
              role="radio"
              aria-checked={calcMode === 'forward'}
              tabIndex={calcMode === 'forward' ? 0 : -1}
              onClick={() => setCalcMode('forward')}
              className={`mode-segment-btn ${calcMode === 'forward' ? 'active' : ''}`}
            >
              <span>Add sales tax</span>
            </button>
          </div>
        )}

        {/* ── Tool Panels (Maintained in DOM for state preservation and SEO indexability) ── */}
        <div id="panel-basic" role="region" aria-label="Standard sales tax calculator" hidden={activeTab !== 'basic'}>
          <BasicTab
            mode={calcMode}
            onModeChange={setCalcMode}
            onSwitchTab={switchTab}
            defaultAmount={defaultAmount}
            defaultRate={defaultRate}
          />
        </div>

        <div id="panel-multiple" role="region" aria-label="Multiple items sales tax calculator" hidden={activeTab !== 'multiple'}>
          <MultipleItemsTab />
        </div>

        <div id="panel-find-rate" role="region" aria-label="Find sales tax rate from receipt" hidden={activeTab !== 'find-rate'}>
          <FindTaxRateTab />
        </div>

        <div id="panel-batch" role="region" aria-label="Batch CSV sales tax calculator" hidden={activeTab !== 'batch'}>
          <BatchModeTab />
        </div>
      </div>

      {/* ── Trust Line Directly Below Card ── */}
      <div
        className="trust-line"
        style={{
          textAlign: 'center',
          fontSize: 13,
          color: 'var(--muted)',
          marginTop: 14,
          fontWeight: 500,
        }}
      >
        Free · No signup · Runs in your browser
      </div>

      {/* ── Prominent 'More tools' Button Group ── */}
      <div
        className="more-tools-container"
        style={{
          marginTop: 18,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          More Calculation Tools
        </span>
        <div
          role="navigation"
          aria-label="Additional calculation tools"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          {/* 1. Multiple Items Button */}
          <button
            type="button"
            onClick={() => handleTabChange('multiple')}
            className={`tool-pill-btn ${activeTab === 'multiple' ? 'active' : ''}`}
            aria-current={activeTab === 'multiple' ? 'page' : undefined}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              <path d="M9 12h6" />
              <path d="M9 16h6" />
            </svg>
            <span>Multiple items</span>
          </button>

          {/* 2. Batch CSV Mode Button */}
          <button
            type="button"
            onClick={() => handleTabChange('batch')}
            className={`tool-pill-btn ${activeTab === 'batch' ? 'active' : ''}`}
            aria-current={activeTab === 'batch' ? 'page' : undefined}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span>Batch CSV mode</span>
          </button>

          {/* 3. Find Tax Rate Button */}
          <button
            type="button"
            onClick={() => handleTabChange('find-rate')}
            className={`tool-pill-btn ${activeTab === 'find-rate' ? 'active' : ''}`}
            aria-current={activeTab === 'find-rate' ? 'page' : undefined}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Find tax rate</span>
          </button>
        </div>
      </div>
    </div>
  );
}
