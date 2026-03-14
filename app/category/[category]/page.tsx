import { getPostsByCategory, CATEGORIES } from '@/lib/posts';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return CATEGORIES.map(c => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find(c => c.slug === category);
  if (!cat) return {};
  return {
    title: `${cat.emoji} ${cat.name} Facts — Gross, Weird & Unbelievable`,
    description: `The most ${cat.name.toLowerCase()} facts on the internet. You'll wish you never read these.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = CATEGORIES.find(c => c.slug === category);
  if (!cat) notFound();

  const posts = getPostsByCategory(category);

  return (
    <>
      {/* Header */}
      <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid #2a2a2a' }}>
        <div style={{ fontSize: '56px', marginBottom: '12px' }}>{cat.emoji}</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '8px' }}>
          <span style={{ color: cat.color }}>{cat.name}</span> Facts
        </h1>
        <p style={{ color: '#888' }}>
          {posts.length} articles · The most {cat.name.toLowerCase()} content on the web
        </p>
      </div>

      {/* Ad */}
      <div className="ad-unit" style={{ marginBottom: '24px', height: '90px' }}>Advertisement</div>

      {posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#555' }}>
          <p style={{ fontSize: '40px' }}>{cat.emoji}</p>
          <p style={{ marginTop: '12px' }}>More {cat.name.toLowerCase()} content coming soon...</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {posts.map(post => (
            <Link key={post.slug} href={`/${post.slug}`} style={{ textDecoration: 'none' }}>
              <article className="card-hover" style={{
                background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '12px',
                padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', gap: '10px',
              }}>
                <div style={{ fontSize: '40px', lineHeight: 1 }}>{post.emoji}</div>
                <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#f0f0f0', lineHeight: 1.25, flex: 1 }}>
                  {post.title}
                </h2>
                <p style={{ fontSize: '13px', color: '#888' }}>{post.excerpt.slice(0, 100)}...</p>
                <div style={{ fontSize: '12px', color: '#555' }}>⏱ {post.readTime}</div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
