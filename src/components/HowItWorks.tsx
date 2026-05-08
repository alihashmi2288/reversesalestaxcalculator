export default function HowItWorks() {
  const steps = [
    {
      num: '1',
      icon: '💰',
      title: 'Enter the Total Price',
      desc: 'Type in the full amount you paid — the price including tax that appears on your receipt or invoice.',
    },
    {
      num: '2',
      icon: '📊',
      title: 'Select or Enter the Tax Rate',
      desc: 'Choose your US state for the combined rate, or enter any custom rate. You can also use our quick-select buttons for common rates.',
    },
    {
      num: '3',
      icon: '✅',
      title: 'Get Your Results Instantly',
      desc: 'Click calculate and instantly see the original pre-tax price, the exact tax amount paid, and a complete breakdown.',
    },
  ];

  return (
    <section>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <span className="section-label">How It Works</span>
        <h2 style={{ fontSize: 36, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 16px' }}>
          3 Simple Steps
        </h2>
        <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto' }}>
          Calculate your pre-tax price in seconds — no account required.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
        {steps.map((step) => (
          <div key={step.num} className="step-card">
            <div style={{ fontSize: 36, marginBottom: 12 }}>{step.icon}</div>
            <div className="step-number">{step.num}</div>
            <h3 style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', marginBottom: 10 }}>{step.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.65 }}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
