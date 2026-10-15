'use client';

import { useEffect } from 'react';

export default function HashScrollHandler() {
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          // Allow DOM and client calculators to hydrate, then smoothly scroll
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' });
          }, 80);
        }
      }
    };

    // Run on initial page load / hydration
    handleHash();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return null;
}
