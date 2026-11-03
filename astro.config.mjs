import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  // 绑定自己的域名后，把这里改成新域名即可（影响 sitemap 和分享卡片）
  site: 'https://steroal.pages.dev',
  integrations: [
    starlight({
      title: 'Steroal',
      description: '工作之外的技术笔记：自建服务、静态站、AI 工具，和还没想清楚的想法。',
      defaultLocale: 'root',
      locales: {
        root: { label: '简体中文', lang: 'zh-CN' },
      },
      customCss: ['./src/styles/custom.css'],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      pagefind: true,
      components: {
        // 自定义页头：品牌居中、右侧四个图标
        Header: './src/components/Header.astro',
        // 首页 hero：天空、云、彩虹
        Hero: './src/components/Hero.astro',
      },
      sidebar: [
        { label: '首页', link: '/' },
        { label: '折腾', autogenerate: { directory: 'tinker' } },
        { label: '随笔', autogenerate: { directory: 'essay' } },
        { label: '索引', autogenerate: { directory: 'library' } },
        { label: '关于', link: '/about/' },
      ],
      head: [
        {
          tag: 'link',
          attrs: { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'alternate',
            type: 'application/rss+xml',
            title: 'Steroal',
            href: '/rss.xml',
          },
        },
      ],
    }),
  ],
});
