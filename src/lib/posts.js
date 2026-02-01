/**
 * Post Data Structure:
 * {
 *   slug: string (filename without extension),
 *   date: string (YYYY-MM-DD),
 *   seq: string (Sequence char),
 *   title: string (Extracted from first line),
 *   content: string (Raw markdown)
 * }
 */

const postFiles = import.meta.glob('/src/content/posts/*.md', { query: '?raw', import: 'default', eager: true });

export function getPosts() {
    const posts = Object.entries(postFiles).map(([path, content]) => {
        const filename = path.split('/').pop().replace('.md', '');

        // Parse Filename: YYYY_MMDD_SEQ (e.g., 2026_0201_A)
        const [year, mmdd, seq] = filename.split('_');
        const date = `${year}-${mmdd.slice(0, 2)}-${mmdd.slice(2)}`;

        // Parse Content: Title from first line '# '
        const firstLine = content.split('\n')[0];
        const title = firstLine.startsWith('# ') ? firstLine.replace('# ', '') : 'Untitled';

        return {
            slug: filename,
            date,
            seq,
            title,
            content
        };
    });

    // Sort by Date DESC, then Seq DESC
    return posts.sort((a, b) => {
        if (a.date !== b.date) return b.date.localeCompare(a.date);
        return b.seq.localeCompare(a.seq);
    });
}
