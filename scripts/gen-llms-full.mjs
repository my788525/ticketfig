/**
 * gen-llms-full.mjs — Generate full llms-full.txt from build output for AI / answer engines.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const CANDIDATE_OUT = ['out', 'dist', 'build'];
const MARKER = '## Complete page index';

const decode = (s) =>
  String(s)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();

function findOutDir() {
  for (const d of CANDIDATE_OUT) {
    if (existsSync(join(d, 'sitemap.xml'))) return d;
  }
  return null;
}

function collectUrls(outDir) {
  const urls = new Set();
  const seen = new Set();
  const readOne = (rel) => {
    if (seen.has(rel)) return;
    seen.add(rel);
    let xml;
    try {
      xml = readFileSync(join(outDir, rel), 'utf8');
    } catch {
      return;
    }
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
    for (const l of locs) {
      if (/\.xml(\?|$)/i.test(l) && /sitemap/i.test(l)) {
        const name = l.split('/').pop();
        if (existsSync(join(outDir, name))) readOne(name);
        else urls.add(l);
      } else {
        urls.add(l);
      }
    }
  };
  readOne('sitemap.xml');
  if (urls.size <= 1) {
    try {
      for (const f of readdirSync(outDir)) {
        if (/^sitemap[-_].*\.xml$/i.test(f)) readOne(f);
      }
    } catch {}
  }
  return [...urls];
}

function htmlFor(url, site, outDir) {
  let p = String(url).replace(site, '').replace(/^https?:\/\/[^/]+/, '');
  p = p.replace(/^\//, '').replace(/\/$/, '');
  if (!p) return join(outDir, 'index.html');
  if (existsSync(join(outDir, p, 'index.html'))) return join(outDir, p, 'index.html');
  return join(outDir, `${p}.html`);
}

function titleOf(file, fallback) {
  if (!existsSync(file)) return fallback;
  try {
    const h = readFileSync(file, 'utf8');
    const m = h.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const t = m ? decode(m[1]) : '';
    return t || fallback;
  } catch {
    return fallback;
  }
}

function blurbFromHome(outDir) {
  const f = join(outDir, 'index.html');
  if (!existsSync(f)) return '';
  try {
    const h = readFileSync(f, 'utf8');
    const m =
      h.match(/<meta\s+name="description"\s+content="([^"]*)"/i) ||
      h.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
    return m ? decode(m[1]) : '';
  } catch {
    return '';
  }
}

function buildIndex(urls, site, outDir) {
  const groups = new Map();
  for (const u of urls) {
    const rest = u.slice(site.length).replace(/^\//, '');
    const seg = rest.split('/')[0] || '';
    const key = seg === '' ? 'Home' : `/${seg}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(u);
  }
  const lines = [];
  lines.push(`${MARKER} (${urls.length} pages)`);
  for (const [key, list] of groups) {
    lines.push('');
    lines.push(`### ${key}`);
    for (const u of list) {
      const slug = u.split('/').filter(Boolean).pop() || u;
      const title = titleOf(htmlFor(u, site, outDir), slug);
      lines.push(`- [${title}](${u})`);
    }
  }
  lines.push('');
  return lines.join('\n');
}

function buildHeader(name, blurb, site) {
  const l = [];
  l.push(`# ${name} — full content index for AI systems (llms-full.txt)`);
  l.push('');
  if (blurb) {
    l.push(`> ${blurb}`);
    l.push('');
  }
  l.push(`This is the machine-readable companion to ${site}/llms.txt. It lists every`);
  l.push(`indexable page on ${name} with its canonical URL.`);
  l.push('');
  return l.join('\n');
}

function main() {
  const outDir = findOutDir();
  if (!outDir) {
    console.log('[llms-full] SKIPPED: no out/dist sitemap.xml');
    return;
  }
  const all = collectUrls(outDir);
  const site = process.env.LLMS_SITE || (all[0] ? new URL(all[0]).origin : '');
  if (!site) return;
  const urls = all.filter((u) => u.startsWith(site)).sort();
  if (!urls.length) return;

  const name = process.env.LLMS_NAME || new URL(site).host;
  const blurb = process.env.LLMS_BLURB || blurbFromHome(outDir);
  const index = buildIndex(urls, site, outDir);
  const finalText = buildHeader(name, blurb, site) + index;

  writeFileSync(join('public', 'llms-full.txt'), finalText, 'utf8');
  try {
    writeFileSync(join(outDir, 'llms-full.txt'), finalText, 'utf8');
  } catch {}
  console.log(`[llms-full] ${urls.length} pages -> public/llms-full.txt + ${outDir}/llms-full.txt`);
}

try {
  main();
} catch (e) {
  console.log('[llms-full] SKIPPED:', e && e.message);
}
process.exit(0);
