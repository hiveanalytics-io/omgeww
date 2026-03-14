# OMG EWW — Content & Revenue Strategy

## The Play
Shameless, factually accurate clickbait. SEO-optimized content about gross/weird/wtf facts.
Traffic → AdSense revenue → offset AI token costs.

## Tech Stack
- **Framework**: Next.js 14 App Router (static generation)
- **Hosting**: Vercel (free tier → Pro if traffic warrants)
- **Domain**: omgeww.com (registered, expires Oct 2026)
- **Content gen**: Ollama llama3.2 (zero cost) for drafts
- **Ads**: Google AdSense → Mediavine/Raptive at 50k sessions/mo

## Content Categories
- 🤢 Gross (bacteria, parasites, body horror)
- 👁️ Weird (history, space, perception)
- 🦟 Animals (deadly, strange, disgusting)
- 🧪 Science (physics, biology, chemistry)
- 🤮 Food (what's actually in your food)
- 💀 History (medieval, ancient, morbid)
- 😱 WTF (absurd facts, geography, technology)

## SEO Strategy
- **Primary keywords**: "gross facts", "weird facts", "disgusting things", "wtf facts", "bizarre science"
- **Long-tail**: "[specific topic] facts", "what is inside [food]", "how many [X] in [Y]"
- **Content cadence**: 2-3 articles/day at launch, 1/day ongoing (all AI-generated)
- **Internal linking**: Each article links to 3 related articles
- **Sitemap**: Auto-generated, submit to Google Search Console
- **Meta**: Each article has unique title, description, and OG tags

## Ad Unit Strategy
### Layout (per page)
1. **Top banner** (728×90) — immediately after headline
2. **Mid-article** (728×90) — after intro paragraph
3. **Sidebar sticky top** (300×250) — high viewability
4. **Sidebar bottom** (300×600) — high RPM
5. **Bottom of article** (300×250) — before related content

### Revenue Projections
- RPM estimate: $3–8 (general content, mixed traffic)
- 10k sessions/mo → $30–80/mo
- 50k sessions/mo → $150–400/mo
- 200k sessions/mo → $600–1,600/mo (Mediavine territory)

## Social Distribution (cost-effective)
### Twitter/X
- Auto-post top fact from each article as a thread
- Format: "🤢 [SHOCKING FACT] — here's why this is true (thread)"
- Post 3x/day, recycle best performers

### Reddit
- Target subreddits: r/todayilearned, r/mildlyinteresting, r/Damnthatsinteresting, r/WTF, r/oddlyterrifying
- Post manually 1–2 times per week (too frequent = ban)
- TIL format works best

### Pinterest
- Create simple text cards with facts (Canva template)
- Pin to boards: "Weird Facts", "Gross Science", "WTF History"
- Pinterest has surprisingly high SEO correlation

### TikTok/Reels (future phase)
- 30-second fact videos with text overlay
- Use ElevenLabs TTS for voiceover (cost-effective)
- Template: black background, orange text, gross emoji

## Content Automation Pipeline
1. **Generate**: `node scripts/generate-content.js` (Ollama llama3.2)
2. **Review**: Quick scan for accuracy (5-10% need fact-checking)
3. **Deploy**: `git push` → Vercel auto-deploys
4. **Social**: Auto-extract top fact → queue Twitter post
5. **Monitor**: Search Console weekly for ranking wins

## Monetization Roadmap
- **Month 1-2**: AdSense setup, hit 10+ articles, submit to Google Search Console
- **Month 3-6**: Build to 200+ articles, target 10k sessions/mo
- **Month 6-12**: Apply to Mediavine (50k sessions req) or Raptive for higher RPM
- **Year 2+**: Sponsored "weird fact" content, affiliate links (weird products, survival gear)

## Cost Summary
- Domain: ~$12/yr (already paid)
- Hosting: $0 (Vercel free tier)
- Content: $0 (Ollama local LLMs)
- Total monthly: **$0** until we scale to Pro Vercel ($20/mo at ~1M requests)
