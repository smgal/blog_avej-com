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

        // --- Parse Frontmatter ---
        let title = 'Untitled';
        let tags = [];
        let summary = '';
        let bodyContent = content;

        // Check if file starts with YAML Frontmatter
        const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
        const match = content.match(frontmatterRegex);

        if (match) {
            const yamlBlock = match[1];
            bodyContent = match[2]; // Content after the second ---

            // Simple YAML parser (handling title, tags, summary)
            const titleMatch = yamlBlock.match(/^title:\s*(.*)$/m);
            if (titleMatch) title = titleMatch[1].trim();

            const summaryMatch = yamlBlock.match(/^summary:\s*(.*)$/m);
            if (summaryMatch) summary = summaryMatch[1].trim();

            // Handle tags (list style)
            // e.g. tags:\n  - tag1\n  - tag2
            // or tags: [tag1, tag2]
            const tagsBlockMatch = yamlBlock.match(/^tags:\s*([\s\S]*?)(?=(?:^[a-z]+:)|$)/m);
            if (tagsBlockMatch) {
                const tagsRaw = tagsBlockMatch[1];
                if (tagsRaw.trim().startsWith('[')) {
                    // Inline array: [tag1, tag2]
                    tags = tagsRaw.replace(/[\[\]]/g, '').split(',').map(t => t.trim());
                } else {
                    // List: - tag1
                    const listMatches = tagsRaw.match(/^\s*-\s*(.*)$/gm);
                    if (listMatches) {
                        tags = listMatches.map(line => line.replace(/^\s*-\s*/, '').trim());
                    }
                }
            }
        } else {
            // Fallback: Parse Title from first line '# ' if no frontmatter
            const firstLine = content.split('\n')[0];
            title = firstLine.startsWith('# ') ? firstLine.replace('# ', '') : 'Untitled';
        }

        return {
            slug: filename,
            date,
            seq,
            title,
            tags,
            summary,
            content: bodyContent
        };
    });

    // Sort by Date DESC, then Seq DESC
    return posts.sort((a, b) => {
        if (a.date !== b.date) return b.date.localeCompare(a.date);
        return b.seq.localeCompare(a.seq);
    });
}
