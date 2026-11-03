import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  // 绑定自己的域名后，把这里改成新域名即可（影响 sitemap 和分享卡片）
  site: 'https://zhetengji.pages.dev',
  integrations: [
    starlight({
      title: '折腾记',
      description: '工作之外的技术笔记：自建服务、AI 工具，和还没想清楚的想法。',
      defaultLocale: 'root',
      locales: {
        root: { label: '简体中文', lang: 'zh-CN' },
      },
      customCss: ['./src/styles/custom.css'],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      pagefind: true,
      sidebar: [
        { label: '首页', link: '/' },
        { label: '折腾', autogenerate: { directory: 'tinker' } },
        { label: '随笔', autogenerate: { directory: 'essay' } },
        { label: '关于', link: '/about/' },
      ],
      head: [
        {
          tag: 'link',
          attrs: { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        },
      ],
    }),
  ],
});
