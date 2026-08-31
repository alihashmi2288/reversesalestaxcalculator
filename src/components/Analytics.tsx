'use client';
import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: any[];
    clarity?: (...args: any[]) => void;
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
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', 'G-MVWDKTE5V4');

      // Load Microsoft Clarity
      (function (c: any, l: any, a: any, r: any, i: any, t?: any, y?: any) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        t = l.createElement(r);
        t.async = 1;
        t.src = 'https://www.clarity.ms/tag/' + i;
        y = l.getElementsByTagName(r)[0];
        if (y && y.parentNode) {
          y.parentNode.insertBefore(t, y);
        } else {
          document.head.appendChild(t);
        }
      })(window, document, 'clarity', 'script', 'y4hti2qol5');
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
        (window as any).requestIdleCallback(() => loadAnalytics());
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
