import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <Analytics />
    </>
  );
}
