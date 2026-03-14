import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About OMG EWW',
  description: 'The internet\'s premier source for disgusting, bizarre, and utterly unhinged facts.',
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '40px 0' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '8px' }}>
        About <span className="gradient-text">OMG EWW</span> 🤢
      </h1>
      <p style={{ color: '#888', marginBottom: '32px' }}>The internet&apos;s most disturbing corner</p>
      <div className="post-content">
        <p>We believe the world would be a better place if everyone knew that their phone has more bacteria than a toilet seat, that caterpillars turn into soup before becoming butterflies, and that ancient Romans used urine as mouthwash.</p>
        <p>OMG EWW is a daily fact site dedicated to the gross, the weird, the WTF, and the genuinely mind-bending corners of science, history, nature, and everyday life.</p>
        <p>Our content is <strong>researched, accurate, and deliberately designed to make you say "OMG EWW"</strong> — and then immediately share it with someone who didn&apos;t need to know.</p>
        <h2>Our Promise</h2>
        <p>Every fact we publish is real. We may be clickbait, but we&apos;re honest clickbait. If we get something wrong, we fix it.</p>
        <p>New articles daily. Disturbing content guaranteed.</p>
      </div>
    </div>
  );
}
