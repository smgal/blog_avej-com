import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

// Register highlighting once at module load. Output already contains
// `<code class="hljs language-xxx">` spans — no post-render DOM walk needed.
marked.use(
    markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        },
    })
);

export function parseMarkdown(text) {
    if (!text) return '';
    return marked.parse(text, { breaks: true });
}
