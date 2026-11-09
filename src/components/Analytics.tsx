'use client';
import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: unknown[];
    clarity?: (...args: unknown[]) => void;
  }
}

export default function Analytics() {
  useEffect(() => {
    // 1. Initialize Google Analytics (G-MVWDKTE5V4)
    if (!document.querySelector('script[src*="G-MVWDKTE5V4"]')) {
      const gaScript = document.createElement('script');
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-MVWDKTE5V4';
      gaScript.async = true;
      document.head.appendChild(gaScript);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', 'G-MVWDKTE5V4');
    }

    // 2. Initialize Microsoft Clarity (y4hti2qol5) with deferred idle loading and cookieless tracking
    const initClarity = () => {
      if (!document.querySelector('script[src*="clarity.ms"]')) {
        const clarityScript = document.createElement('script');
        clarityScript.async = true;
        clarityScript.src = 'https://www.clarity.ms/tag/y4hti2qol5';
        document.head.appendChild(clarityScript);

        window.clarity =
          window.clarity ||
          function (...args: unknown[]) {
            ((window.clarity as unknown as { q: unknown[] }).q =
              (window.clarity as unknown as { q: unknown[] }).q || []).push(args);
          };

        // Enforce cookieless mode to prevent 3rd-party tracking cookie overhead
        window.clarity('consent', false);
      }
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(initClarity, { timeout: 2500 });
    } else {
      setTimeout(initClarity, 1500);
    }
  }, []);

  return null;
}
