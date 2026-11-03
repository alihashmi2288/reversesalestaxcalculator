'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import BasicTab from './BasicTab';
import MultipleItemsTab from './MultipleItemsTab';
import FindTaxRateTab from './FindTaxRateTab';
import BatchModeTab from './BatchModeTab';

function CalculatorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="16" y1="14" x2="16" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

const TABS = [
  { id: 'basic', label: 'Basic', icon: <CalculatorIcon />, desc: 'Single price calculation' },
  { id: 'multiple', label: 'Multiple Items', icon: <ListIcon />, desc: 'Bulk item calculator' },
  { id: 'find-rate', label: 'Find Tax Rate', icon: <SearchIcon />, desc: 'Discover applied rate' },
  { id: 'batch', label: 'Batch Mode', icon: <LightningIcon />, desc: 'Process many at once' },
];

export default function CalculatorCard() {
  const [activeTab, setActiveTab] = useState('basic');

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % TABS.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + TABS.length) % TABS.length;
    } else if (e.key === 'Home') {
      newIndex = 0;
    } else if (e.key === 'End') {
      newIndex = TABS.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setActiveTab(TABS[newIndex].id);
    document.getElementById(`tab-${TABS[newIndex].id}`)?.focus();
  };

  return (
    <div id="calculator-card" className="calc-card" style={{ minHeight: 480 }}>
      {/* Tab Bar */}
      <div className="calc-tab-bar" role="tablist" aria-label="Calculator Modes">
        {TABS.map((tab, idx) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`calc-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            title={tab.desc}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ minHeight: 380 }}>
        <div id="panel-basic" role="tabpanel" aria-labelledby="tab-basic" tabIndex={0} hidden={activeTab !== 'basic'}>
          <BasicTab />
        </div>
        <div id="panel-multiple" role="tabpanel" aria-labelledby="tab-multiple" tabIndex={0} hidden={activeTab !== 'multiple'}>
          <MultipleItemsTab />
        </div>
        <div id="panel-find-rate" role="tabpanel" aria-labelledby="tab-find-rate" tabIndex={0} hidden={activeTab !== 'find-rate'}>
          <FindTaxRateTab />
        </div>
        <div id="panel-batch" role="tabpanel" aria-labelledby="tab-batch" tabIndex={0} hidden={activeTab !== 'batch'}>
          <BatchModeTab />
        </div>
      </div>
    </div>
  );
}
