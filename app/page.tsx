import Link from 'next/link';
import { getAllPosts, CATEGORIES } from '@/lib/posts';

function PostCard({ post, featured = false }: { post: ReturnType<typeof getAllPosts>[0]; featured?: boolean }) {
  const cat = CATEGORIES.find(c => c.slug === post.category.toLowerCase()) || CATEGORIES[0];
  return (
    <Link href={`/${post.slug}`} style={{ textDecoration: 'none' }}>
      <article
        className="card-hover"
        style={{
          background: '#1a1a1a',
          border: '1px solid #2a2a2a',
          borderRadius: '12px',
          padding: featured ? '28px' : '20px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          cursor: 'pointer',
        }}
      >
        <div style={{ fontSize: featured ? '56px' : '40px', lineHeight: 1 }}>{post.emoji}</div>
        <div>
          <span
            className="category-badge"
            style={{ background: `${cat.color}22`, color: cat.color, border: `1px solid ${cat.color}44` }}
          >
            {cat.emoji} {post.category}
          </span>
        </div>
        <h2
          style={{
            fontSize: featured ? '1.5rem' : '1.05rem',
            fontWeight: 800,
            color: '#f0f0f0',
            lineHeight: 1.25,
            flex: 1,
          }}
        >
          {post.title}
        </h2>
        <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.5 }}>
          {post.excerpt}
        </p>
        <div style={{ fontSize: '12px', color: '#555', display: 'flex', gap: '12px' }}>
          <span>📅 {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span>⏱ {post.readTime}</span>
        </div>
      </article>
    </Link>
  );
}

function AdUnit({ width = '100%', height = 90, label = 'Advertisement' }: { width?: string; height?: number; label?: string }) {
  return (
    <div className="ad-unit" style={{ width, height }}>
      <span>{label}</span>
    </div>
  );
}

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts.slice(0, 1)[0];
  const recent = posts.slice(1, 7);
  const more = posts.slice(7, 19);

  return (
    <>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '40px', padding: '32px 0 16px' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '12px' }}>
          Facts So{' '}
          <span className="gradient-text">Disgusting</span>
          <br />You Can&apos;t Stop Reading 🤢
        </h1>
        <p style={{ color: '#888', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>
          Gross science. Weird history. Bizarre animals. The internet&apos;s most unhinged facts, delivered daily.
        </p>
      </div>

      {/* Top Ad */}
      <AdUnit height={90} label="Advertisement — 728×90" />

      {/* Categories */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '24px 0' }}>
        {CATEGORIES.map(cat => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            style={{
              padding: '8px 16px',
              borderRadius: '24px',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none',
              background: `${cat.color}18`,
              color: cat.color,
              border: `1px solid ${cat.color}33`,
            }}
          >
            {cat.emoji} {cat.name}
          </Link>
        ))}
      </div>

      {posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#555' }}>
          <p style={{ fontSize: '48px' }}>🤢</p>
          <p style={{ marginTop: '16px' }}>Content loading... check back soon.</p>
        </div>
      ) : (
        <>
          {/* Featured + sidebar */}
          {featured && (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: '20px', marginBottom: '32px' }}
              className="featured-grid">
              <PostCard post={featured} featured />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555' }}>Trending Now</h3>
                {recent.slice(0, 3).map(p => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          )}

          {/* Mid Ad */}
          <AdUnit height={90} label="Advertisement — 728×90" />

          {/* Main grid */}
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: '32px 0 16px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            🔥 Latest Grossness
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {[...recent.slice(3), ...more].map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {/* Bottom Ad */}
          <AdUnit height={250} label="Advertisement — 300×250" />
        </>
      )}
    </>
  );
}
