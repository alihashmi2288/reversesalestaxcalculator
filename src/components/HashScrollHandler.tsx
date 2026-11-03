'use client';

import { useEffect } from 'react';

export default function HashScrollHandler() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Handle browser back/forward and hash changes
    const onHashChange = () => scrollToHash();
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('popstate', onHashChange);

    // Guard timer scheduling to avoid scheduling unneeded setTimeout callbacks when there is no URL hash
    if (typeof window !== 'undefined' && !window.location.hash) {
      return () => {
        window.removeEventListener('hashchange', onHashChange);
        window.removeEventListener('popstate', onHashChange);
      };
    }

    // Run on mount with progressive retries for hydration & layout shifts
    scrollToHash();
    const t1 = setTimeout(scrollToHash, 100);
    const t2 = setTimeout(scrollToHash, 300);
    const t3 = setTimeout(scrollToHash, 700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('popstate', onHashChange);
    };
  }, []);

  return null;
}
