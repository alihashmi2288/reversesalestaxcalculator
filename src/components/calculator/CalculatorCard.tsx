'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import BasicTab from './BasicTab';

const TabLoadingFallback = () => (
  <div style={{ minHeight: 380, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 14 }}>
    Loading calculator...
  </div>
);

const MultipleItemsTab = dynamic(() => import('./MultipleItemsTab'), { 
  loading: TabLoadingFallback,
});
const FindTaxRateTab = dynamic(() => import('./FindTaxRateTab'), { 
  loading: TabLoadingFallback,
});
const BatchModeTab = dynamic(() => import('./BatchModeTab'), { 
  loading: TabLoadingFallback,
});

const TABS = [
  { id: 'basic', label: 'Basic', icon: '🧮', desc: 'Single price calculation' },
  { id: 'multiple', label: 'Multiple Items', icon: '📋', desc: 'Bulk item calculator' },
  { id: 'find-rate', label: 'Find Tax Rate', icon: '🔍', desc: 'Discover applied rate' },
  { id: 'batch', label: 'Batch Mode', icon: '⚡', desc: 'Process many at once' },
];

export default function CalculatorCard() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div id="calculator" className="calc-card" style={{ minHeight: 480 }}>
      {/* Tab Bar */}
      <div className="calc-tab-bar" role="tablist" aria-label="Calculator Modes">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`calc-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            title={tab.desc}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ minHeight: 380 }}>
        {activeTab === 'basic'      && <div id="panel-basic" role="tabpanel" aria-labelledby="tab-basic"><BasicTab /></div>}
        {activeTab === 'multiple'   && <div id="panel-multiple" role="tabpanel" aria-labelledby="tab-multiple"><MultipleItemsTab /></div>}
        {activeTab === 'find-rate'  && <div id="panel-find-rate" role="tabpanel" aria-labelledby="tab-find-rate"><FindTaxRateTab /></div>}
        {activeTab === 'batch'      && <div id="panel-batch" role="tabpanel" aria-labelledby="tab-batch"><BatchModeTab /></div>}
      </div>
    </div>
  );
}
