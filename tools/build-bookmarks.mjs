/**
 * 把本机浏览器的书签抽出来，去重、脱敏、归类，写到 src/data/bookmarks.json。
 *
 * 用法：node tools/build-bookmarks.mjs
 * 只读浏览器数据，不修改任何原始文件。
 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const HOME = os.homedir();

const SOURCES = [
  { browser: 'Edge', file: `${HOME}/AppData/Local/Microsoft/Edge/User Data/Default/Bookmarks` },
  { browser: 'Edge', file: `${HOME}/AppData/Local/Microsoft/Edge/User Data/Profile 1/Bookmarks` },
  { browser: 'Chrome', file: `${HOME}/AppData/Local/Google/Chrome/User Data/Default/Bookmarks` },
  { browser: 'Chrome', file: `${HOME}/AppData/Local/Google/Chrome/User Data/Profile 1/Bookmarks` },
  { browser: 'Brave', file: `${HOME}/AppData/Local/BraveSoftware/Brave-Browser/User Data/Default/Bookmarks` },
  { browser: 'QQ浏览器', file: `${HOME}/AppData/Local/Tencent/QQBrowser/User Data/Default/Bookmarks` },
  { browser: '360', file: `${HOME}/AppData/Local/360Chrome/Chrome/User Data/Default/Bookmarks` },
  { browser: 'Firefox', file: `${HOME}/AppData/Roaming/Mozilla/Firefox/Profiles` },
];

/** 文件夹名 → 大类 */
const FOLDER_MAP = [
  { match: /嵌入式|单片机|硬件|IPC|驱动|Linux/i, group: '嵌入式与底层' },
  { match: /^(Code|github|Tools|Extend|Download|稍后再读)$/i, group: '开发与工具' },
  { match: /^(PC|Goto|翻翻翻|BOOK|Academic|Study)$/i, group: '学习与资料' },
  { match: /^(Game|Movie|Joy|guita|Life|壁纸|财经|Mail)$/i, group: '生活与杂项' },
];

/** 明确不公开的内容：招聘、内网、本地文件、需登录的个人页面 */
const DENY_HOST = /(mokahr\.com|hotjob\.cn|zhaopin\.com|liepin\.com|51job\.com|nowcoder\.com|lagou\.com|talent\.[a-z0-9-]+)/i;
const DENY_URL = /^(file:|javascript:|chrome:|edge:|about:)/i;
const PRIVATE_HOST = /^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/i;
const DENY_FOLDER = /VPN|翻墙|招聘|求职/i;

const groupOf = (folderPath) => {
  for (const p of FOLDER_MAP) {
    for (const seg of folderPath) {
      if (p.match.test(seg)) return p.group;
    }
  }
  return '生活与杂项';
};

const walk = (node, pathArr, push) => {
  if (node.type === 'url') {
    push({ title: node.name, url: node.url, path: pathArr });
    return;
  }
  for (const child of node.children ?? []) {
    walk(child, node.name ? [...pathArr, node.name] : pathArr, push);
  }
};

const raw = [];
const readFiles = [];

for (const src of SOURCES) {
  if (!fs.existsSync(src.file) || !fs.statSync(src.file).isFile()) continue;
  try {
    const data = JSON.parse(fs.readFileSync(src.file, 'utf8'));
    const roots = data.roots ?? {};
    let count = 0;
    for (const key of Object.keys(roots)) {
      if (key === 'workspaces_v2') continue;
      const root = roots[key];
      if (!root) continue;
      for (const child of root.children ?? []) {
        walk(child, [], (item) => {
          raw.push({ ...item, browser: src.browser });
          count++;
        });
      }
    }
    readFiles.push({ browser: src.browser, file: src.file.replace(HOME, '~'), count });
  } catch (err) {
    console.error('读取失败', src.file, err.message);
  }
}

/* ---------------- 过滤 ---------------- */
const excluded = { 内网或本地: 0, 招聘网站: 0, 敏感目录: 0, 重复: 0, 非法地址: 0 };
const seen = new Set();
const kept = [];

for (const item of raw) {
  let host = '';
  try {
    host = new URL(item.url).hostname;
  } catch {
    excluded.非法地址++;
    continue;
  }

  if (DENY_URL.test(item.url)) {
    excluded.非法地址++;
    continue;
  }
  if (PRIVATE_HOST.test(host)) {
    excluded.内网或本地++;
    continue;
  }
  if (DENY_HOST.test(host)) {
    excluded.招聘网站++;
    continue;
  }
  if (item.path.some((p) => DENY_FOLDER.test(p))) {
    excluded.敏感目录++;
    continue;
  }

  const key = item.url.replace(/#.*$/, '').replace(/\/$/, '');
  if (seen.has(key)) {
    excluded.重复++;
    continue;
  }
  seen.add(key);

  kept.push({
    title: (item.title || host).trim().slice(0, 120),
    url: item.url,
    host: host.replace(/^www\./, ''),
    group: groupOf(item.path),
    folder: item.path[item.path.length - 1] ?? '',
    browser: item.browser,
  });
}

/* ---------------- 输出 ---------------- */
const GROUP_ORDER = ['嵌入式与底层', '开发与工具', '学习与资料', '生活与杂项'];
const groups = GROUP_ORDER.map((name) => ({
  name,
  items: kept
    .filter((i) => i.group === name)
    .sort((a, b) => a.host.localeCompare(b.host) || a.title.localeCompare(b.title)),
})).filter((g) => g.items.length > 0);

const hosts = {};
for (const i of kept) hosts[i.host] = (hosts[i.host] ?? 0) + 1;
const topHosts = Object.entries(hosts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 12)
  .map(([host, n]) => ({ host, n }));

const payload = {
  generatedAt: new Date().toISOString().slice(0, 10),
  total: raw.length,
  kept: kept.length,
  excluded,
  sources: readFiles,
  topHosts,
  groups,
};

const outFile = path.resolve('src/data/bookmarks.json');
fs.writeFileSync(outFile, JSON.stringify(payload, null, 2), 'utf8');

console.log('来源：');
for (const f of readFiles) console.log(`  ${f.browser} — ${f.count} 条 — ${f.file}`);
console.log(`\n原始 ${raw.length} 条 → 保留 ${kept.length} 条`);
console.log('排除：', excluded);
console.log('\n分组：');
for (const g of groups) console.log(`  ${g.name}: ${g.items.length}`);
console.log('\nTop 域名：', topHosts.map((h) => `${h.host}(${h.n})`).join(', '));
console.log('\n写入', outFile);
