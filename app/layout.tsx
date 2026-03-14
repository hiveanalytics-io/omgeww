import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/posts';

export const metadata: Metadata = {
  title: { default: 'OMG EWW — Gross, Weird & WTF Facts You Can\'t Unread', template: '%s | OMG EWW' },
  description: 'The internet\'s most disgusting, bizarre, and mind-blowing facts. You\'ll wish you never clicked. But you will.',
  keywords: ['gross facts', 'weird facts', 'disgusting things', 'wtf facts', 'bizarre science', 'gross animals'],
  openGraph: {
    siteName: 'OMG EWW',
    type: 'website',
  },
};

const TICKER_ITEMS = [
  '🤢 The average person swallows 8 spiders per year in their sleep',
  '👁️ Your eyeballs are literally brain tissue',
  '🦟 Mosquitoes have killed more humans than all wars combined',
  '💀 Cleopatra lived closer in time to the Moon landing than to the pyramids being built',
  '🧪 Honey never spoils — they found 3,000-year-old honey in Egyptian tombs and it was still good',
  '😱 There are more bacteria in your mouth than people on Earth',
  '🤮 The hotdog you just ate is 30% eyelid',
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        {/* Google AdSense — insert publisher ID here */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous"></script> */}
      </head>
      <body>
        {/* Ticker */}
        <div className="ticker-wrap">
          <div className="ticker">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} style={{ padding: '0 40px', fontSize: '12px', fontWeight: 600, color: 'white' }}>{item}</span>
            ))}
          </div>
        </div>

        {/* Header */}
        <header style={{ background: '#0f0f0f', borderBottom: '1px solid #2a2a2a', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: '26px', fontWeight: 900, letterSpacing: '-0.03em' }}>
                <span className="gradient-text">OMG</span>
                <span style={{ color: '#f0f0f0' }}> EWW</span>
                <span style={{ fontSize: '20px', marginLeft: '4px' }}>🤢</span>
              </span>
            </Link>
            <nav style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {CATEGORIES.map(cat => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="hide-mobile"
                  style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    background: `${cat.color}22`,
                    color: cat.color,
                    border: `1px solid ${cat.color}44`,
                    transition: 'background 0.2s',
                  }}
                >
                  {cat.emoji} {cat.name}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {/* Main */}
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
          {children}
        </main>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid #2a2a2a', marginTop: '48px', padding: '24px 16px', textAlign: 'center', color: '#555', fontSize: '13px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p>© {new Date().getFullYear()} OMG EWW — Facts so gross, you&apos;ll share them anyway 🤢</p>
            <div style={{ marginTop: '8px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <Link href="/about" style={{ color: '#555', textDecoration: 'none' }}>About</Link>
              <Link href="/privacy" style={{ color: '#555', textDecoration: 'none' }}>Privacy</Link>
              <Link href="/sitemap.xml" style={{ color: '#555', textDecoration: 'none' }}>Sitemap</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
