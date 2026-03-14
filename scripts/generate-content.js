#!/usr/bin/env node
/**
 * Content generator for omgeww.com
 * Uses local Ollama (llama3.2) — zero API cost
 * Usage: node scripts/generate-content.js
 */

const fs = require('fs');
const path = require('path');

const OLLAMA_URL = 'http://localhost:11434/api/generate';
const MODEL = 'llama3.2'; // Fast, cheap, good enough for this
const POSTS_DIR = path.join(__dirname, '../content/posts');

if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });

const ARTICLE_PROMPTS = [
  // GROSS
  { category: 'gross', emoji: '🦠', slug: 'your-phone-has-more-bacteria-than-a-toilet', title: '10 Things With More Bacteria Than a Toilet (Your Phone Is #1)', tags: ['bacteria', 'germs', 'gross facts', 'hygiene'] },
  { category: 'gross', emoji: '🪱', slug: 'parasites-living-inside-you-right-now', title: 'The Parasites That Might Be Living Inside You Right Now', tags: ['parasites', 'biology', 'gross', 'science'] },
  { category: 'gross', emoji: '💀', slug: 'what-happens-to-your-body-after-death', title: 'What Actually Happens to Your Body 24 Hours After You Die', tags: ['death', 'biology', 'gross', 'decomposition'] },
  { category: 'gross', emoji: '🫁', slug: 'how-much-dead-skin-you-shed-per-year', title: 'You Shed an Entire Pound of Skin Every Year — Here\'s Where It Goes', tags: ['skin', 'gross', 'human body', 'facts'] },
  { category: 'gross', emoji: '👄', slug: 'whats-living-in-your-mouth', title: '700 Species of Bacteria Live in Your Mouth. Meet Your Roommates.', tags: ['bacteria', 'mouth', 'oral hygiene', 'gross'] },
  { category: 'gross', emoji: '😴', slug: 'spiders-in-your-sleep-myth-vs-truth', title: 'The Spider Swallowing Sleep Myth: What You\'re Actually Ingesting', tags: ['spiders', 'sleep', 'myths', 'gross'] },
  { category: 'gross', emoji: '🧫', slug: 'why-belly-buttons-are-ecosystems', title: 'Your Belly Button Is a Unique Microbial Ecosystem (Scientists Found 2,368 Species)', tags: ['belly button', 'microbiome', 'science', 'gross'] },

  // WEIRD
  { category: 'weird', emoji: '🧠', slug: 'brain-eats-itself-when-hungry', title: 'Your Brain Literally Eats Itself When You\'re Sleep Deprived', tags: ['brain', 'sleep', 'weird science', 'neuroscience'] },
  { category: 'weird', emoji: '👁️', slug: 'cleopatra-lived-closer-to-moon-landing', title: 'Cleopatra Lived Closer in Time to the Moon Landing Than the Pyramids', tags: ['history', 'weird facts', 'egypt', 'timeline'] },
  { category: 'weird', emoji: '🌊', slug: 'ocean-is-barely-explored', title: 'We\'ve Explored Less Than 20% of Earth\'s Oceans — Here\'s What Could Be Down There', tags: ['ocean', 'exploration', 'weird', 'science'] },
  { category: 'weird', emoji: '⏰', slug: 'time-passes-faster-if-youre-taller', title: 'Time Passes Faster the Taller You Are (Einstein Was Right and It\'s Measurable)', tags: ['physics', 'time', 'einstein', 'weird science'] },
  { category: 'weird', emoji: '🪞', slug: 'your-face-is-not-symmetrical', title: 'The Face You See in the Mirror Is a Lie — You\'ve Never Seen Your Real Face', tags: ['perception', 'mirrors', 'weird', 'psychology'] },
  { category: 'weird', emoji: '🌀', slug: 'there-are-more-stars-than-grains-of-sand', title: 'More Stars in the Universe Than Grains of Sand on Every Beach on Earth', tags: ['space', 'stars', 'universe', 'weird facts'] },

  // ANIMALS
  { category: 'animals', emoji: '🦟', slug: 'mosquitoes-deadliest-animal-history', title: 'Mosquitoes Have Killed More Humans Than Every War in History Combined', tags: ['mosquitoes', 'deadly animals', 'disease', 'history'] },
  { category: 'animals', emoji: '🐙', slug: 'octopus-three-hearts-blue-blood', title: 'Octopuses Have 3 Hearts, Blue Blood, and 9 Brains — And That\'s the Normal Stuff', tags: ['octopus', 'animals', 'weird biology', 'ocean'] },
  { category: 'animals', emoji: '🐜', slug: 'ants-weigh-more-than-humans-combined', title: 'Ants Probably Outweigh All Humans on Earth (Yes, Really)', tags: ['ants', 'biomass', 'weird facts', 'insects'] },
  { category: 'animals', emoji: '🦦', slug: 'sea-otters-hold-hands-sleeping', title: 'Sea Otters Hold Hands While Sleeping So They Don\'t Drift Apart', tags: ['sea otters', 'cute animals', 'ocean', 'facts'] },
  { category: 'animals', emoji: '🐛', slug: 'caterpillar-turns-to-soup-in-cocoon', title: 'Inside a Cocoon, a Caterpillar Dissolves Into Soup Before Becoming a Butterfly', tags: ['butterfly', 'metamorphosis', 'gross', 'biology'] },
  { category: 'animals', emoji: '🦈', slug: 'sharks-older-than-trees', title: 'Sharks Are Older Than Trees. Let That Sink In.', tags: ['sharks', 'evolution', 'prehistoric', 'weird facts'] },

  // SCIENCE
  { category: 'science', emoji: '⚛️', slug: 'atoms-in-your-body-are-mostly-empty', title: 'If You Removed All Empty Space From Atoms in Humans, We\'d Fit in a Sugar Cube', tags: ['atoms', 'physics', 'weird science', 'matter'] },
  { category: 'science', emoji: '🧬', slug: 'you-share-dna-with-banana', title: 'You Share 60% of Your DNA With a Banana', tags: ['DNA', 'genetics', 'biology', 'weird science'] },
  { category: 'science', emoji: '🔥', slug: 'hottest-thing-in-universe', title: 'The Hottest Thing in the Universe Is a Temperature We Can\'t Even Write Out', tags: ['temperature', 'physics', 'universe', 'science'] },
  { category: 'science', emoji: '💧', slug: 'water-has-a-memory-myth-debunked', title: 'Does Water Have Memory? The Pseudoscience vs. The Wild Real Science of Water', tags: ['water', 'chemistry', 'myths', 'science'] },
  { category: 'science', emoji: '🌋', slug: 'yellowstone-supervolcano-overdue', title: 'Yellowstone\'s Supervolcano Is "Overdue" — What Would Actually Happen', tags: ['volcano', 'yellowstone', 'disaster', 'science'] },

  // FOOD
  { category: 'food', emoji: '🌭', slug: 'hotdog-ingredients-you-didnt-want-to-know', title: 'Hot Dogs Contain Parts of the Animal You\'d Never Order Intentionally', tags: ['hot dogs', 'food industry', 'gross food', 'ingredients'] },
  { category: 'food', emoji: '🍫', slug: 'chocolate-contains-insect-parts', title: 'The FDA Allows 60 Insect Fragments Per 100 Grams of Chocolate', tags: ['chocolate', 'FDA', 'insects', 'food regulation'] },
  { category: 'food', emoji: '🍎', slug: 'apples-are-mostly-air', title: 'Apples Are 25% Air — You\'ve Been Crunching Mostly Nothing Your Whole Life', tags: ['apples', 'food science', 'weird facts', 'fruit'] },
  { category: 'food', emoji: '🍯', slug: 'honey-never-expires-why', title: 'Honey Never Expires. Scientists Ate 3,000-Year-Old Egyptian Honey and It Was Fine.', tags: ['honey', 'food science', 'history', 'preservation'] },
  { category: 'food', emoji: '☕', slug: 'kopi-luwak-most-expensive-coffee-poop', title: 'The World\'s Most Expensive Coffee Is Made From Cat Poop', tags: ['coffee', 'kopi luwak', 'gross food', 'luxury'] },
  { category: 'food', emoji: '🥩', slug: 'dry-aged-steak-is-controlled-rot', title: 'Dry-Aged Steak Is Technically Controlled Rotting — That\'s Why It Tastes Amazing', tags: ['steak', 'dry aging', 'fermentation', 'gross food'] },

  // HISTORY
  { category: 'history', emoji: '⚔️', slug: 'medieval-dentistry-was-a-nightmare', title: 'Medieval Dentistry Was Performed by Barbers With Zero Anesthesia', tags: ['medieval', 'dentistry', 'history', 'gross history'] },
  { category: 'history', emoji: '🧪', slug: 'ancient-rome-used-urine-as-mouthwash', title: 'Ancient Romans Used Urine as Mouthwash (And It Worked)', tags: ['ancient rome', 'urine', 'history', 'gross'] },
  { category: 'history', emoji: '💀', slug: 'victorian-photographs-of-the-dead', title: 'Victorians Posed Dead Relatives for Family Photos. Here\'s Why.', tags: ['victorian era', 'death', 'photography', 'history'] },
  { category: 'history', emoji: '🏛️', slug: 'pyramids-had-gold-caps-originally', title: 'The Egyptian Pyramids Were Originally White and Had Gold Tops — We Stripped Them', tags: ['egypt', 'pyramids', 'history', 'ancient world'] },
  { category: 'history', emoji: '☠️', slug: 'black-death-killed-half-of-europe', title: 'The Black Death May Have Actually Made Life Better for Survivors', tags: ['black death', 'plague', 'history', 'medieval'] },

  // WTF
  { category: 'wtf', emoji: '😱', slug: 'north-korea-uses-its-own-time-zone', title: 'North Korea Invented Its Own Time Zone to Be Contrarian', tags: ['north korea', 'wtf facts', 'weird history', 'politics'] },
  { category: 'wtf', emoji: '🤡', slug: 'there-is-a-clown-shortage', title: 'America Is Experiencing an Official Clown Shortage (The Professional Association Confirms)', tags: ['clowns', 'wtf', 'america', 'absurd'] },
  { category: 'wtf', emoji: '📱', slug: 'your-iphone-has-more-computing-power-than-nasa-apollo', title: 'Your iPhone Has More Computing Power Than All of NASA Had for the Moon Landing', tags: ['iphone', 'technology', 'NASA', 'wtf facts'] },
  { category: 'wtf', emoji: '💸', slug: 'more-money-in-monopoly-than-us-treasury', title: 'More Monopoly Money Is Printed Each Year Than Real US Dollars', tags: ['monopoly', 'money', 'wtf', 'finance'] },
  { category: 'wtf', emoji: '🌐', slug: 'russia-is-wider-than-pluto', title: 'Russia Is Wider Than Pluto\'s Diameter', tags: ['russia', 'pluto', 'geography', 'wtf facts'] },
];

async function generateArticle(prompt) {
  const systemPrompt = `You are a writer for "OMG EWW" — a viral clickbait content site about gross, weird, and mind-blowing facts. 
Write a 500-700 word article that is:
- Genuinely factual and accurate
- Written in an engaging, slightly sensationalized clickbait style  
- Structured with clear headers (use ## for h2, ### for h3)
- Includes specific facts, numbers, and surprising details
- Uses occasional em-dashes, rhetorical questions, and punchy one-liners
- Ends with a memorable "bottom line" paragraph
Do NOT use markdown code blocks. Just write the article body directly. No front matter.`;

  const userPrompt = `Write an article titled: "${prompt.title}"
Category: ${prompt.category}
Tags: ${prompt.tags.join(', ')}

The article should:
- Open with the most shocking fact immediately (no boring intro)
- Use ## subheadings to break it up
- Include 3-5 specific, verifiable facts with numbers/dates
- Be written for people who share gross/weird facts on social media
- End with something memorable and shareable

Write the article body only. No title, no front matter.`;

  const res = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, prompt: `${systemPrompt}\n\nUser: ${userPrompt}\n\nAssistant:`, stream: false, options: { temperature: 0.8, num_predict: 900 } }),
  });

  if (!res.ok) throw new Error(`Ollama error: ${res.status}`);
  const data = await res.json();
  return data.response?.trim() || '';
}

function slugToDate(index) {
  // Spread articles over the past 60 days for SEO freshness
  const d = new Date();
  d.setDate(d.getDate() - index);
  return d.toISOString().split('T')[0];
}

async function generateAll() {
  const existing = fs.readdirSync(POSTS_DIR).map(f => f.replace('.md', ''));
  const toGenerate = ARTICLE_PROMPTS.filter(p => !existing.includes(p.slug));

  console.log(`\n🤢 OMG EWW Content Generator`);
  console.log(`📄 ${toGenerate.length} articles to generate (${existing.length} already exist)\n`);

  if (toGenerate.length === 0) {
    console.log('All articles already generated!');
    return;
  }

  for (let i = 0; i < toGenerate.length; i++) {
    const p = toGenerate[i];
    console.log(`[${i + 1}/${toGenerate.length}] Generating: ${p.slug}`);

    try {
      const content = await generateArticle(p);

      if (!content || content.length < 100) {
        console.log(`  ⚠️  Too short, skipping`);
        continue;
      }

      // Extract excerpt from first paragraph
      const firstPara = content.split('\n').find(line => line.trim() && !line.startsWith('#'));
      const excerpt = firstPara ? firstPara.slice(0, 160).replace(/\*\*/g, '') + '...' : p.title;

      const frontmatter = `---
title: "${p.title.replace(/"/g, '\\"')}"
excerpt: "${excerpt.replace(/"/g, '\\"')}"
category: "${p.category}"
emoji: "${p.emoji}"
tags: [${p.tags.map(t => `"${t}"`).join(', ')}]
date: "${slugToDate(ARTICLE_PROMPTS.indexOf(p))}"
metaDescription: "${excerpt.replace(/"/g, '\\"').slice(0, 155)}"
---

`;
      fs.writeFileSync(path.join(POSTS_DIR, `${p.slug}.md`), frontmatter + content, 'utf-8');
      console.log(`  ✅ Saved (${content.length} chars)`);

      // Brief pause between requests
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.error(`  ❌ Error: ${err.message}`);
    }
  }

  console.log(`\n🎉 Done! ${fs.readdirSync(POSTS_DIR).length} articles in content/posts/`);
}

generateAll();
