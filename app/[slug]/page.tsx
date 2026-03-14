import { getAllPosts, getPostBySlug, CATEGORIES } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.tags,
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  };
}

function processMarkdown(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hublp])(.+)$/gm, '$1')
    .replace(/^<\/p><p>(<[hbu])/gm, '$1')
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const cat = CATEGORIES.find(c => c.slug === post.category.toLowerCase()) || CATEGORIES[0];
  const allPosts = getAllPosts();
  const related = allPosts.filter(p => p.slug !== slug && p.category === post.category).slice(0, 3);

  const htmlContent = `<p>${processMarkdown(post.content)}</p>`;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: '32px', alignItems: 'start' }}>
      {/* Article */}
      <article>
        {/* Breadcrumb */}
        <div style={{ fontSize: '13px', color: '#555', marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#555', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href={`/category/${cat.slug}`} style={{ color: cat.color, textDecoration: 'none' }}>{cat.name}</Link>
          <span>›</span>
          <span style={{ color: '#888' }}>{post.title.slice(0, 40)}...</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px', lineHeight: 1 }}>{post.emoji}</div>
          <span
            style={{
              display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '12px',
              fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
              background: `${cat.color}22`, color: cat.color, border: `1px solid ${cat.color}44`,
              marginBottom: '16px',
            }}
          >
            {cat.emoji} {post.category}
          </span>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, lineHeight: 1.2, marginBottom: '16px' }}>
            {post.title}
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#aaa', lineHeight: 1.6, marginBottom: '16px' }}>
            {post.excerpt}
          </p>
          <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#555', paddingTop: '16px', borderTop: '1px solid #2a2a2a' }}>
            <span>📅 {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>⏱ {post.readTime}</span>
          </div>
        </div>

        {/* Top ad */}
        <div className="ad-unit" style={{ marginBottom: '24px', height: '90px' }}>Advertisement</div>

        {/* Content */}
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #2a2a2a' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555', marginBottom: '12px' }}>Tags</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {post.tags.map(tag => (
                <span key={tag} style={{ padding: '4px 12px', background: '#2a2a2a', borderRadius: '20px', fontSize: '12px', color: '#888' }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom ad */}
        <div className="ad-unit" style={{ marginTop: '32px', height: '250px' }}>Advertisement — 300×250</div>

        {/* Share nudge */}
        <div style={{ marginTop: '32px', padding: '24px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '12px', textAlign: 'center' }}>
          <p style={{ fontSize: '20px', marginBottom: '8px' }}>😱 Can&apos;t keep this to yourself?</p>
          <p style={{ color: '#888', fontSize: '14px' }}>Share this with someone who deserves to be disturbed</p>
        </div>
      </article>

      {/* Sidebar */}
      <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '80px' }}>
        {/* Sidebar ad */}
        <div className="ad-unit" style={{ height: '250px' }}>Advertisement — 300×250</div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555', marginBottom: '16px' }}>
              More {cat.emoji} {cat.name}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {related.map(p => {
                const rc = CATEGORIES.find(c => c.slug === p.category.toLowerCase()) || CATEGORIES[0];
                return (
                  <Link key={p.slug} href={`/${p.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="card-hover" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '10px', padding: '14px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '28px', lineHeight: 1 }}>{p.emoji}</span>
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: 700, color: '#f0f0f0', lineHeight: 1.3, marginBottom: '4px' }}>{p.title}</p>
                        <span style={{ fontSize: '11px', color: rc.color }}>{rc.emoji} {p.category}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Second sidebar ad */}
        <div className="ad-unit" style={{ height: '600px' }}>Advertisement — 300×600</div>
      </aside>
    </div>
  );
}
