import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for OMG EWW.',
};

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '40px 0' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '32px' }}>Privacy Policy</h1>
      <div className="post-content">
        <p><strong>Last updated:</strong> March 2026</p>
        <h2>What we collect</h2>
        <p>We use Google Analytics and advertising cookies to understand traffic and serve relevant ads. We don&apos;t collect personal information unless you contact us directly.</p>
        <h2>Advertising</h2>
        <p>We use Google AdSense to display ads. Google may use cookies to serve personalized advertisements based on your visits to this and other sites. You can opt out via <a href="https://www.google.com/settings/ads" style={{ color: '#ff6b35' }}>Google&apos;s Ad Settings</a>.</p>
        <h2>Cookies</h2>
        <p>We use necessary cookies for site functionality and optional analytics/advertising cookies. You can disable these in your browser settings.</p>
        <h2>Contact</h2>
        <p>Questions? Email us at hello@omgeww.com</p>
      </div>
    </div>
  );
}
