import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// 注意：Astro 5.18 的 glob loader 默认生成的 id 会保留 .md / .mdx 后缀，
// 而 Starlight 的路由按「无后缀 id」匹配，会导致所有文章都不生成。
// 这里显式剥掉扩展名。
const stripExt = ({ entry }: { entry: string }) =>
  entry.replace(/\.(md|mdx|markdown|mdown|mkdn|mkd|mdwn)$/i, '');

export const collections = {
  docs: defineCollection({
    loader: docsLoader({ generateId: stripExt }),
    schema: docsSchema(),
  }),
};
