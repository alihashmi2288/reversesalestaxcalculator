import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="noise-overlay pointer-events-none fixed inset-0 z-50 opacity-[0.04]"></div>
      <div className="grid-bg pointer-events-none fixed inset-0 z-[-1]"></div>
      <Navbar />
      {children}
      <Footer />
      <Analytics />
    </>
  );
}
