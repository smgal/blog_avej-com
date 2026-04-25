import yaml from 'js-yaml';

/**
 * Post:
 *   slug: string      - filename without extension
 *   date: string      - YYYY-MM-DD derived from filename
 *   seq: string       - sequence char from filename
 *   title: string
 *   tags: string[]
 *   summary: string
 *   content: string   - markdown body (frontmatter stripped)
 */

const postFiles = import.meta.glob('/src/content/posts/*.md', { query: '?raw', import: 'default', eager: true });

const FILENAME_RE = /^(\d{4})_(\d{2})(\d{2})_([A-Z0-9]+)$/;
const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function parseFrontmatter(raw) {
    const m = raw.match(FRONTMATTER_RE);
    if (!m) return { data: {}, content: raw };
    return { data: yaml.load(m[1]) ?? {}, content: m[2] };
}

export function getPosts() {
    const posts = Object.entries(postFiles).map(([path, raw]) => {
        const filename = path.split('/').pop().replace('.md', '');
        const m = filename.match(FILENAME_RE);
        if (!m) {
            throw new Error(`Post filename must match YYYY_MMDD_SEQ.md: ${filename}`);
        }
        const [, year, mm, dd, seq] = m;

        const { data, content } = parseFrontmatter(raw);

        return {
            slug: filename,
            date: `${year}-${mm}-${dd}`,
            seq,
            title: data.title ?? 'Untitled',
            tags: Array.isArray(data.tags) ? data.tags : [],
            summary: data.summary ?? '',
            content,
        };
    });

    return posts.sort((a, b) => {
        if (a.date !== b.date) return b.date.localeCompare(a.date);
        return b.seq.localeCompare(a.seq);
    });
}
