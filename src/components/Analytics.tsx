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
    let loaded = false;

    const loadAnalytics = () => {
      if (loaded) return;
      loaded = true;

      // Clean up event listeners
      window.removeEventListener('scroll', onInteraction);
      window.removeEventListener('pointerdown', onInteraction);
      window.removeEventListener('touchstart', onInteraction);
      window.removeEventListener('keydown', onInteraction);

      // Load Google Analytics
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

      // Load Microsoft Clarity
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
    };

    const onInteraction = () => {
      loadAnalytics();
    };

    // User interaction triggers
    window.addEventListener('scroll', onInteraction, { passive: true, once: true });
    window.addEventListener('pointerdown', onInteraction, { passive: true, once: true });
    window.addEventListener('touchstart', onInteraction, { passive: true, once: true });
    window.addEventListener('keydown', onInteraction, { passive: true, once: true });

    // Idle fallback after 3.5 seconds
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        window.requestIdleCallback(() => loadAnalytics());
      } else {
        loadAnalytics();
      }
    }, 3500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onInteraction);
      window.removeEventListener('pointerdown', onInteraction);
      window.removeEventListener('touchstart', onInteraction);
      window.removeEventListener('keydown', onInteraction);
    };
  }, []);

  return null;
}
