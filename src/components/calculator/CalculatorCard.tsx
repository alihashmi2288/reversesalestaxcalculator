'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const BasicTab = dynamic(() => import('./BasicTab'), { ssr: false });
const MultipleItemsTab = dynamic(() => import('./MultipleItemsTab'), { ssr: false });
const FindTaxRateTab = dynamic(() => import('./FindTaxRateTab'), { ssr: false });
const BatchModeTab = dynamic(() => import('./BatchModeTab'), { ssr: false });

const TABS = [
  { id: 'basic', label: 'Basic', icon: '🧮', desc: 'Single price calculation' },
  { id: 'multiple', label: 'Multiple Items', icon: '📋', desc: 'Bulk item calculator' },
  { id: 'find-rate', label: 'Find Tax Rate', icon: '🔍', desc: 'Discover applied rate' },
  { id: 'batch', label: 'Batch Mode', icon: '⚡', desc: 'Process many at once' },
];

export default function CalculatorCard() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div id="calculator" className="calc-card">
      {/* Tab Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 32, paddingBottom: 4 }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`calc-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            title={tab.desc}
          >
            <span style={{ marginRight: 6 }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'basic'      && <BasicTab />}
      {activeTab === 'multiple'   && <MultipleItemsTab />}
      {activeTab === 'find-rate'  && <FindTaxRateTab />}
      {activeTab === 'batch'      && <BatchModeTab />}
    </div>
  );
}
