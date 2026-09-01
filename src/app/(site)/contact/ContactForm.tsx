'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactForm() {
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

  if (submitted) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: 48 }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
        <h2 style={{ fontWeight: 800, fontSize: 24, color: 'var(--text-primary)', marginBottom: 12 }}>
          Message Sent!
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
          Thanks for reaching out. We&apos;ll get back to you at <strong>{form.email}</strong> as soon as possible — usually within 1–2 business days.
        </p>
        <Link
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
        </Link>
      </div>
    );
  }

  return (
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
            background: loading ? '#27272a' : 'var(--primary)',
            color: loading ? '#71717a' : '#000',
            border: loading ? '2px solid #3f3f46' : '2px solid #000',
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
  );
}
