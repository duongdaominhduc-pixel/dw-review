<template>
  <span v-html="renderedHtml" class="formula-view inline-block"></span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import katex from 'katex';

const props = withDefaults(
  defineProps<{
    formula: string;
    displayMode?: boolean;
    isPureLatex?: boolean;
  }>(),
  {
    displayMode: false,
    isPureLatex: false,
  }
);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const renderedHtml = computed(() => {
  if (!props.formula) return '';
  const text = props.formula;

  // If explicitly flagged as pure LaTeX formula
  if (props.isPureLatex) {
    try {
      return katex.renderToString(text, {
        displayMode: props.displayMode,
        throwOnError: false,
      });
    } catch {
      return `<code>${escapeHtml(text)}</code>`;
    }
  }

  // If text does NOT contain '$', it is regular Vietnamese/English prose.
  // DO NOT pass to KaTeX, otherwise KaTeX strips spaces and renders as math variables!
  if (!text.includes('$')) {
    return escapeHtml(text).replace(/\n/g, '<br/>');
  }

  // Parse text containing $$ (display) or $ (inline)
  let result = '';
  let i = 0;
  while (i < text.length) {
    if (text.startsWith('$$', i)) {
      const end = text.indexOf('$$', i + 2);
      if (end !== -1) {
        const math = text.slice(i + 2, end).trim();
        try {
          result += katex.renderToString(math, {
            displayMode: true,
            throwOnError: false,
          });
        } catch {
          result += `<code>${escapeHtml(math)}</code>`;
        }
        i = end + 2;
        continue;
      }
    } else if (text.startsWith('$', i)) {
      const end = text.indexOf('$', i + 1);
      if (end !== -1) {
        const math = text.slice(i + 1, end).trim();
        try {
          result += katex.renderToString(math, {
            displayMode: false,
            throwOnError: false,
          });
        } catch {
          result += `<code>${escapeHtml(math)}</code>`;
        }
        i = end + 1;
        continue;
      }
    }

    if (text[i] === '\n') {
      result += '<br/>';
    } else if (text[i] === '<') {
      result += '&lt;';
    } else if (text[i] === '>') {
      result += '&gt;';
    } else if (text[i] === '&') {
      result += '&amp;';
    } else {
      result += text[i];
    }
    i++;
  }

  return result;
});
</script>

<style>
.formula-view .katex-display {
  margin: 0.5em 0;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.25em 0;
}
</style>
