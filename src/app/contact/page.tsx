'use client';

import { useState } from 'react';

// Metadata is handled separately for client components — we use a static export approach
// For a proper Next.js app, metadata for client components should go in a wrapper
// We'll handle the head via next/head alternative: a server wrapper

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email = 'Please enter a valid email.';
    if (!form.subject.trim()) e.subject = 'Subject is required.';
    if (!form.message.trim()) e.message = 'Message is required.';
    else if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters.';
    return e;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    // Simulate async send — in production connect to a form backend (e.g. Resend, Formspree)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    background: 'var(--card-bg)',
    border: '2px solid var(--border)',
    borderRadius: 'var(--radius)',
    color: 'var(--text-primary)',
    fontSize: 16,
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  const errorStyle: React.CSSProperties = {
    color: '#f87171',
    fontSize: 13,
    marginTop: 4,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 14,
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: 6,
  };

  return (
    <main>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', padding: '64px 0', textAlign: 'center' }}>
        <div className="container-main">
          <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, color: '#fff', marginBottom: 16 }}>
            Contact Us
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 520, margin: '0 auto' }}>
            Have a question, a rate update, or just want to say hi? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 1000, margin: '64px auto 80px', padding: '0 24px' }}>
        {/* Breadcrumb */}
        <nav style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 48 }}>
          <a href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>Contact</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40, alignItems: 'start' }} className="contact-layout">
          {/* Form */}
          <div>
            {submitted ? (
              <div className="card" style={{ textAlign: 'center', padding: 48 }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                <h2 style={{ fontWeight: 800, fontSize: 24, color: 'var(--text-primary)', marginBottom: 12 }}>
                  Message Sent!
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
                  Thanks for reaching out. We&apos;ll get back to you at <strong>{form.email}</strong> as soon as possible — usually within 1–2 business days.
                </p>
                <a
                  href="/"
                  style={{
                    background: 'var(--primary)',
                    color: '#000',
                    padding: '12px 32px',
                    borderRadius: 'var(--radius)',
                    fontWeight: 800,
                    fontSize: 15,
                    textDecoration: 'none',
                    display: 'inline-block',
                    border: '2px solid #000',
                    boxShadow: '3px 3px 0px 0px #000',
                  }}
                >
                  Back to Calculator →
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="card">
                  <h2 style={{ fontWeight: 800, fontSize: 22, color: 'var(--text-primary)', marginBottom: 24 }}>
                    Send Us a Message
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }} className="form-grid">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" style={labelStyle}>Your Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={handleChange}
                        style={{ ...inputStyle, ...(errors.name ? { borderColor: '#f87171' } : {}) }}
                        autoComplete="name"
                      />
                      {errors.name && <p style={errorStyle}>{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" style={labelStyle}>Email Address</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="jane@example.com"
                        value={form.email}
                        onChange={handleChange}
                        style={{ ...inputStyle, ...(errors.email ? { borderColor: '#f87171' } : {}) }}
                        autoComplete="email"
                      />
                      {errors.email && <p style={errorStyle}>{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div style={{ marginBottom: 20 }}>
                    <label htmlFor="subject" style={labelStyle}>Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      style={{ ...inputStyle, cursor: 'pointer', ...(errors.subject ? { borderColor: '#f87171' } : {}) }}
                    >
                      <option value="">Select a topic…</option>
                      <option value="Tax Rate Update">Tax Rate Update / Correction</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Bug Report">Bug Report</option>
                      <option value="General Question">General Question</option>
                      <option value="Partnership">Partnership / Advertising</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && <p style={errorStyle}>{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: 28 }}>
                    <label htmlFor="message" style={labelStyle}>Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Describe your question or request in detail…"
                      value={form.message}
                      onChange={handleChange}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 140, ...(errors.message ? { borderColor: '#f87171' } : {}) }}
                    />
                    {errors.message && <p style={errorStyle}>{errors.message}</p>}
                  </div>

                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={loading}
                    style={{
                      background: loading ? 'var(--border)' : 'var(--primary)',
                      color: '#000',
                      border: '2px solid #000',
                      boxShadow: loading ? 'none' : '3px 3px 0px 0px #000',
                      borderRadius: 'var(--radius)',
                      fontWeight: 800,
                      fontSize: 16,
                      padding: '14px 36px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.15s',
                      width: '100%',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {loading ? 'Sending…' : 'Send Message →'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }} className="contact-sidebar">
            {/* Direct Contact */}
            <div className="card">
              <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 16 }}>✉️ Email Us Directly</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
                You can also reach us directly at:
              </p>
              <a
                href="mailto:salestaxreversecalculator@gmail.com"
                style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 14, textDecoration: 'underline', wordBreak: 'break-all' }}
              >
                salestaxreversecalculator@gmail.com
              </a>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 12, lineHeight: 1.6 }}>
                We aim to respond within 1–2 business days.
              </p>
            </div>

            {/* Common Topics */}
            <div className="card">
              <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 16 }}>💬 Common Topics</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { icon: '📊', text: 'Reporting an incorrect tax rate' },
                  { icon: '🐛', text: 'Reporting a bug or calculation error' },
                  { icon: '💡', text: 'Suggesting a new feature' },
                  { icon: '🤝', text: 'Partnership or advertising inquiries' },
                  { icon: '❓', text: 'General questions about the tool' },
                ].map(({ icon, text }) => (
                  <li key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, color: 'var(--text-secondary)' }}>
                    <span>{icon}</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="card">
              <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 16 }}>🔗 Quick Links</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { href: '/faq', label: 'Read our FAQ' },
                  { href: '/how-it-works', label: 'How the calculator works' },
                  { href: '/about', label: 'About our tool' },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <a href={href} style={{ color: 'var(--primary)', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
                      {label} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-layout { grid-template-columns: 1fr !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .contact-sidebar { position: static !important; }
        }
      `}</style>
    </main>
  );
}
