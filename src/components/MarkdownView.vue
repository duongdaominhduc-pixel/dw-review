<template>
  <div class="markdown-view prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed" v-html="renderedHtml"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { marked } from 'marked';
import katex from 'katex';

const props = defineProps<{
  content: string;
}>();

const renderedHtml = computed(() => {
  if (!props.content) return '';
  let text = props.content;

  // Preserve and render $$ ... $$ display math
  const mathBlocks: string[] = [];
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
    const id = `%%%MATHBLOCK_${mathBlocks.length}%%%`;
    try {
      mathBlocks.push(katex.renderToString(math.trim(), { displayMode: true, throwOnError: false }));
    } catch {
      mathBlocks.push(`<code>${math}</code>`);
    }
    return id;
  });

  // Preserve and render $ ... $ inline math
  const mathInlines: string[] = [];
  text = text.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
    const id = `%%%MATHINLINE_${mathInlines.length}%%%`;
    try {
      mathInlines.push(katex.renderToString(math.trim(), { displayMode: false, throwOnError: false }));
    } catch {
      mathInlines.push(`<code>${math}</code>`);
    }
    return id;
  });

  // Convert markdown to HTML
  let html = marked.parse(text, { async: false, breaks: true, gfm: true }) as string;

  // Restore math
  for (let i = 0; i < mathBlocks.length; i++) {
    html = html.replace(`%%%MATHBLOCK_${i}%%%`, mathBlocks[i]);
  }
  for (let i = 0; i < mathInlines.length; i++) {
    html = html.replace(`%%%MATHINLINE_${i}%%%`, mathInlines[i]);
  }

  return html;
});
</script>

<style scoped>
:deep(h3) {
  font-size: 1.05rem;
  font-weight: 700;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  color: #1e293b;
}
:deep(.dark h3),
.dark :deep(h3) {
  color: #f1f5f9;
}
:deep(h4) {
  font-size: 0.95rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.35rem;
}
:deep(ul) {
  list-style-type: disc;
  padding-left: 1.25rem;
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
}
:deep(ol) {
  list-style-type: decimal;
  padding-left: 1.25rem;
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
}
:deep(li) {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
:deep(p) {
  margin-top: 0.4rem;
  margin-bottom: 0.5rem;
}
:deep(hr) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-color: #e2e8f0;
}
.dark :deep(hr) {
  border-color: #334155;
}
:deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.8rem;
}
:deep(th) {
  background-color: #f8fafc;
  border: 1px solid #cbd5e1;
  padding: 0.5rem;
  font-weight: 700;
}
.dark :deep(th) {
  background-color: #1e293b;
  border-color: #475569;
}
:deep(td) {
  border: 1px solid #cbd5e1;
  padding: 0.4rem 0.5rem;
}
.dark :deep(td) {
  border-color: #475569;
}
:deep(blockquote) {
  border-left: 4px solid #3b82f6;
  padding-left: 0.75rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-style: italic;
  color: #475569;
}
.dark :deep(blockquote) {
  border-color: #60a5fa;
  color: #94a3b8;
}
</style>
