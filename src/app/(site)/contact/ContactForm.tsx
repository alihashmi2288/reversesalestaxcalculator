'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (submitted && successHeadingRef.current) {
      successHeadingRef.current.focus();
    }
  }, [submitted]);

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
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstField = Object.keys(errs)[0];
      const el = document.getElementById(firstField);
      if (el) el.focus();
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    background: '#ffffff',
    border: '1px solid var(--hairline-strong)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--ink)',
    fontSize: 15,
    fontFamily: 'var(--font-sans)',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  const errorStyle: React.CSSProperties = {
    color: 'var(--error)',
    fontSize: 13,
    marginTop: 4,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 14,
    fontWeight: 700,
    color: 'var(--ink)',
    marginBottom: 6,
  };

  if (submitted) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: 48 }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          style={{ fontWeight: 800, fontSize: 24, color: 'var(--ink)', marginBottom: 12, outline: 'none' }}
        >
          Message Sent!
        </h2>
        <p style={{ color: 'var(--body)', fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
          Thanks for reaching out. We&apos;ll get back to you at <strong>{form.email}</strong> as soon as possible — usually within 1–2 business days.
        </p>
        <Link
          href="/"
          style={{
            background: 'var(--primary)',
            color: '#ffffff',
            padding: '12px 32px',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
            display: 'inline-block',
            border: '1px solid var(--primary-deep)',
            boxShadow: 'none',
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
        <h2 style={{ fontWeight: 800, fontSize: 22, color: 'var(--ink)', marginBottom: 24 }}>
          Send Us a Message
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 20 }} className="form-grid">
          {/* Name */}
          <div>
            <label htmlFor="name" style={labelStyle}>Your Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.name)}
              placeholder="Jane Smith"
              value={form.name}
              onChange={handleChange}
              style={{ ...inputStyle, ...(errors.name ? { borderColor: 'var(--error)' } : {}) }}
              autoComplete="name"
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && <p id="name-error" style={errorStyle}>{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" style={labelStyle}>Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.email)}
              placeholder="jane@example.com"
              value={form.email}
              onChange={handleChange}
              style={{ ...inputStyle, ...(errors.email ? { borderColor: 'var(--error)' } : {}) }}
              autoComplete="email"
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && <p id="email-error" style={errorStyle}>{errors.email}</p>}
          </div>
        </div>

        {/* Subject */}
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="subject" style={labelStyle}>Subject</label>
          <select
            id="subject"
            name="subject"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.subject)}
            value={form.subject}
            onChange={handleChange}
            style={{ ...inputStyle, cursor: 'pointer', ...(errors.subject ? { borderColor: 'var(--error)' } : {}) }}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
          >
            <option value="">Select a topic…</option>
            <option value="Tax Rate Update">Tax Rate Update / Correction</option>
            <option value="Feature Request">Feature Request</option>
            <option value="Bug Report">Bug Report</option>
            <option value="General Question">General Question</option>
            <option value="Partnership">Partnership / Advertising</option>
            <option value="Other">Other</option>
          </select>
          {errors.subject && <p id="subject-error" style={errorStyle}>{errors.subject}</p>}
        </div>

        {/* Message */}
        <div style={{ marginBottom: 28 }}>
          <label htmlFor="message" style={labelStyle}>Message</label>
          <textarea
            id="message"
            name="message"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            rows={6}
            placeholder="Describe your question or request in detail."
            value={form.message}
            onChange={handleChange}
            style={{ ...inputStyle, resize: 'vertical', minHeight: 140, ...(errors.message ? { borderColor: 'var(--error)' } : {}) }}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && <p id="message-error" style={errorStyle}>{errors.message}</p>}
        </div>

        <button
          id="contact-submit"
          type="submit"
          disabled={loading}
          style={{
            background: loading ? 'var(--canvas-soft)' : 'var(--primary)',
            color: loading ? 'var(--muted)' : '#ffffff',
            border: loading ? '1px solid var(--hairline-strong)' : '1px solid var(--primary-deep)',
            boxShadow: 'none',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 700,
            fontSize: 15,
            padding: '13px 32px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease',
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
