import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'content/posts');

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  emoji: string;
  metaDescription: string;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  return files
    .map(file => {
      const slug = file.replace('.md', '');
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      const { data, content } = matter(raw);
      const words = content.split(/\s+/).length;
      const readTime = `${Math.ceil(words / 200)} min read`;
      return { slug, content, readTime, ...data } as Post;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const file = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf-8');
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).length;
  const readTime = `${Math.ceil(words / 200)} min read`;
  return { slug, content, readTime, ...data } as Post;
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(p => p.category.toLowerCase() === category.toLowerCase());
}

export const CATEGORIES = [
  { name: 'Gross', emoji: '🤢', slug: 'gross', color: '#22c55e' },
  { name: 'Weird', emoji: '👁️', slug: 'weird', color: '#a855f7' },
  { name: 'Animals', emoji: '🦟', slug: 'animals', color: '#f97316' },
  { name: 'Science', emoji: '🧪', slug: 'science', color: '#3b82f6' },
  { name: 'Food', emoji: '🤮', slug: 'food', color: '#ef4444' },
  { name: 'History', emoji: '💀', slug: 'history', color: '#eab308' },
  { name: 'WTF', emoji: '😱', slug: 'wtf', color: '#ec4899' },
];
