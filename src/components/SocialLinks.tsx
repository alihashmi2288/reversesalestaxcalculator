import React from 'react';

export interface SocialChannel {
  name: string;
  handle: string;
  url: string;
  description: string;
  color: string;
  hoverBg: string;
  ariaLabel: string;
}

export const SOCIAL_CHANNELS: SocialChannel[] = [
  {
    name: 'Instagram',
    handle: '@pretaxprice',
    url: 'https://www.instagram.com/pretaxprice/',
    description: 'Visual tax tips, infographics & receipt breakdowns',
    color: '#E1306C',
    hoverBg: 'rgba(225, 48, 108, 0.08)',
    ariaLabel: 'Follow PreTaxPrice on Instagram (opens in a new tab)',
  },
  {
    name: 'X (Twitter)',
    handle: '@PreTaxPrice',
    url: 'https://x.com/PreTaxPrice',
    description: 'Instant tax rate alerts & statutory announcements',
    color: '#000000',
    hoverBg: 'rgba(0, 0, 0, 0.06)',
    ariaLabel: 'Follow PreTaxPrice on X (Twitter) (opens in a new tab)',
  },
  {
    name: 'LinkedIn',
    handle: 'PreTaxPrice',
    url: 'https://www.linkedin.com/company/pretaxprice/',
    description: 'Business accounting insights & tax analysis',
    color: '#0A66C2',
    hoverBg: 'rgba(10, 102, 194, 0.08)',
    ariaLabel: 'Connect with PreTaxPrice on LinkedIn (opens in a new tab)',
  },
  {
    name: 'Facebook',
    handle: '@pretaxprice',
    url: 'https://www.facebook.com/pretaxprice/',
    description: 'Community guides, rate updates & discussions',
    color: '#1877F2',
    hoverBg: 'rgba(24, 119, 242, 0.08)',
    ariaLabel: 'Follow PreTaxPrice on Facebook (opens in a new tab)',
  },
];

export function SocialIcon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  switch (name) {
    case 'Instagram':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'X (Twitter)':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'LinkedIn':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.729C24 .774 23.205 0 22.222 0h.003z" />
        </svg>
      );
    case 'Facebook':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    default:
      return null;
  }
}

interface SocialLinksProps {
  variant?: 'cards' | 'sidebar' | 'icons';
  className?: string;
}

export default function SocialLinks({ variant = 'cards', className = '' }: SocialLinksProps) {
  // Footer Minimal Icon Buttons (WCAG >= 44x44px target)
  if (variant === 'icons') {
    return (
      <ul
        className={`flex items-center gap-2 flex-wrap m-0 p-0 list-none ${className}`}
        role="list"
        aria-label="Social media profiles"
      >
        {SOCIAL_CHANNELS.map((item) => (
          <li key={item.name} role="listitem">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer me"
              aria-label={item.ariaLabel}
              title={item.name}
              className="w-11 h-11 flex items-center justify-center rounded-[var(--radius-xs)] border border-[var(--hairline-strong)] bg-[var(--canvas)] text-[var(--body)] hover:text-[var(--primary)] hover:border-[var(--primary)] hover:bg-[var(--mint-50)] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[var(--forest)] focus-visible:outline-offset-2"
            >
              <SocialIcon name={item.name} size={18} />
            </a>
          </li>
        ))}
      </ul>
    );
  }

  // Sidebar Compact List (Contact Page)
  if (variant === 'sidebar') {
    return (
      <ul className={`flex flex-col gap-2.5 m-0 p-0 list-none ${className}`} role="list">
        {SOCIAL_CHANNELS.map((item) => (
          <li key={item.name} role="listitem">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer me"
              aria-label={item.ariaLabel}
              className="flex items-center justify-between p-3 rounded-[var(--radius-sm)] border border-[var(--hairline)] bg-[var(--canvas-soft)] hover:bg-[var(--mint-50)] hover:border-[var(--primary)] text-[var(--ink)] hover:text-[var(--primary-deep)] transition-all duration-150 group focus-visible:outline-2 focus-visible:outline-[var(--forest)] focus-visible:outline-offset-2 min-h-[48px]"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-8 h-8 rounded-[var(--radius-xs)] flex items-center justify-center text-white shrink-0 shadow-xs"
                  style={{ backgroundColor: item.color }}
                >
                  <SocialIcon name={item.name} size={16} />
                </span>
                <div className="text-left">
                  <span className="block text-[13.5px] font-bold leading-tight group-hover:text-[var(--primary)] transition-colors">
                    {item.name}
                  </span>
                  <span className="block text-[12px] text-[var(--muted)] font-medium leading-tight mt-0.5">
                    {item.handle}
                  </span>
                </div>
              </div>
              <span
                className="text-[var(--muted)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all duration-150 text-sm font-semibold pl-2"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  // Default Grid Cards (About Page)
  return (
    <ul
      className={`grid grid-cols-1 sm:grid-cols-2 gap-4 m-0 p-0 list-none ${className}`}
      role="list"
      aria-label="Official PreTaxPrice Social Channels"
    >
      {SOCIAL_CHANNELS.map((item) => (
        <li key={item.name} role="listitem" className="flex">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label={item.ariaLabel}
            className="w-full flex flex-col justify-between p-5 rounded-[var(--radius)] border border-[var(--hairline-strong)] bg-[var(--canvas)] hover:border-[var(--primary)] hover:bg-[var(--mint-50)] transition-all duration-150 group focus-visible:outline-2 focus-visible:outline-[var(--forest)] focus-visible:outline-offset-2 min-h-[110px]"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-3">
                <span
                  className="w-9 h-9 rounded-[var(--radius-xs)] flex items-center justify-center text-white shrink-0 shadow-xs"
                  style={{ backgroundColor: item.color }}
                >
                  <SocialIcon name={item.name} size={18} />
                </span>
                <div>
                  <span className="block text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--primary)] transition-colors leading-tight">
                    {item.name}
                  </span>
                  <span className="block text-[13px] text-[var(--primary-deep)] font-semibold mt-0.5 font-mono">
                    {item.handle}
                  </span>
                </div>
              </div>
              <span
                className="text-[var(--muted)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150 text-base font-bold"
                aria-hidden="true"
              >
                ↗
              </span>
            </div>
            <p className="text-[13px] text-[var(--body)] leading-relaxed m-0 mt-1">
              {item.description}
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
}
