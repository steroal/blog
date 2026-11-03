import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://steroal.pages.dev';

const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs');

  const posts = docs
    .filter((d) => d.id !== 'index' && d.id !== 'about' && !d.id.endsWith('/index'))
    .map((d) => ({
      title: d.data.title,
      description: d.data.description ?? '',
      url: `${SITE}/${d.id}/`,
      date: d.data.date ?? new Date(),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${p.url}</link>
      <guid>${p.url}</guid>
      <description>${esc(p.description)}</description>
      <pubDate>${p.date.toUTCString()}</pubDate>
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Steroal</title>
    <link>${SITE}/</link>
    <description>工作之外的技术笔记：自建服务、静态站、AI 工具。</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
