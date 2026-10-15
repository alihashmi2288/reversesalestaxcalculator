import Link from 'next/link';

export default function HowItWorks() {
  return (
    <section>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <span className="section-label">Calculation Process</span>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: 'var(--ink)', margin: '10px 0 14px' }}>
          3 Simple Steps to Reverse Sales Tax
        </h2>
        <p style={{ fontSize: 16, color: 'var(--body)', maxWidth: 580, margin: '0 auto' }}>
          Calculate your original pre-tax price in seconds — completely private with client-side computation.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
        {[
          {
            num: '1',
            title: 'Enter Total Price Paid',
            desc: 'Type in the final amount from your invoice or checkout receipt — the total inclusive of all sales tax or VAT.',
          },
          {
            num: '2',
            title: 'Specify Sales Tax Rate',
            desc: 'Select your US state for the statutory combined rate, use one of our quick presets, or enter any custom rate worldwide.',
          },
          {
            num: '3',
            title: 'View Instant Breakdown',
            desc: 'Get immediate mathematical verification: the original pre-tax cost, total sales tax amount paid, and formula breakdown.',
            extra: (
              <span style={{ display: 'block', marginTop: 12 }}>
                Use the{' '}
                <Link href="/#calculator" className="link-green">
                  reverse tax calculator
                </Link>{' '}
                to back out tax from any receipt with zero manual math.
              </span>
            ),
          },
        ].map((step) => (
          <div key={step.num} className="step-card">
            <div className="step-number">{step.num}</div>
            <h3 style={{ fontWeight: 700, fontSize: 18, color: 'var(--ink)', marginBottom: 8 }}>{step.title}</h3>
            <p style={{ color: 'var(--body)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              {step.desc}
              {step.extra}
            </p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <Link
          href="/how-it-works"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--primary)',
            textDecoration: 'none',
            padding: '10px 22px',
            borderRadius: 'var(--radius-sm)',
            border: '1.5px solid var(--primary)',
            backgroundColor: 'var(--canvas)',
            transition: 'all 0.15s ease',
          }}
          className="hover-subtle"
        >
          <span>Read Full Step-by-Step Mathematical Guide &amp; Formula</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
