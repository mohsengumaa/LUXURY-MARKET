import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export const metadata: Metadata = {
  title: 'Luxury Marketplace - منصة التجارة الفاخرة - Lüks Pazar',
  description: 'منصة حصرية لبيع وشراء السلع الفاخرة - Exclusive platform for luxury goods - Lüks ürünler için özel platform',
  keywords: 'luxury, marketplace, real estate, cars, watches, jewelry, عقارات فاخرة, سيارات فاخرة, lüks emlak, lüks arabalar',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
