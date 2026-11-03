'use client';

import React, { useState } from 'react';
import { CALIFORNIA_FAQS } from '@/data/californiaTaxData';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default
  const [search, setSearch] = useState('');

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const filteredFaqs = CALIFORNIA_FAQS.filter((faq) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Search Filter */}
      <div style={{ maxWidth: 420, width: '100%', marginBottom: 8 }}>
        <div className="input-wrapper">
          <span className="input-prefix" aria-hidden="true" style={{ fontSize: 14 }}>🔍</span>
          <input
            type="text"
            name="faqSearch"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search California tax questions..."
            className="calc-input with-prefix"
            style={{ height: 42, fontSize: 14 }}
            aria-label="Filter frequently asked questions"
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filteredFaqs.length === 0 ? (
          <div className="card" style={{ padding: 24, textAlign: 'center', color: 'var(--muted)' }}>
            No questions match &quot;{search}&quot;. Try another search term.
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const triggerId = `faq-trigger-${idx}`;
            const panelId = `faq-panel-${idx}`;
            return (
              <div
                key={faq.question}
                className="faq-item"
                style={{
                  border: '1px solid var(--hairline-strong)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--canvas)',
                  overflow: 'hidden',
                }}
              >
                <h4 style={{ margin: 0, padding: 0, fontSize: 'inherit', fontWeight: 'inherit' }}>
                  <button
                    type="button"
                    id={triggerId}
                    aria-controls={panelId}
                    aria-expanded={isOpen}
                    onClick={() => toggle(idx)}
                    className="faq-trigger"
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                      background: isOpen ? 'var(--canvas-soft)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>
                      {faq.question}
                    </span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="2.5"
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.15s ease',
                      }}
                    >
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </button>
                </h4>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className="faq-content"
                  style={{
                    display: isOpen ? 'block' : 'none',
                    padding: '16px 20px 20px',
                    color: 'var(--body)',
                    lineHeight: 1.65,
                    fontSize: 15,
                    borderTop: '1px solid var(--hairline)',
                  }}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
