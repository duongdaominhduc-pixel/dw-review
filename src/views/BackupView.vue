<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <div class="text-center">
      <div class="w-16 h-16 rounded-2xl bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-300 flex items-center justify-center text-3xl mx-auto mb-3">
        💾
      </div>
      <h1 class="text-2xl font-black text-slate-900 dark:text-white">
        Sao lưu & Khôi phục Tiến độ
      </h1>
      <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
        Toàn bộ dữ liệu được lưu an toàn trên trình duyệt của bạn (localStorage). Bạn có thể xuất file để chuyển sang thiết bị khác bất cứ lúc nào.
      </p>
    </div>

    <!-- Export Panel -->
    <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
      <div class="flex items-center gap-3">
        <span class="text-2xl">📤</span>
        <div>
          <h2 class="text-base font-bold text-slate-900 dark:text-white">
            1. Xuất file tiến độ (Download JSON)
          </h2>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Lưu toàn bộ lịch sử học, các hộp Leitner, câu hỏi đã sửa và bộ câu hỏi yếu ra file
          </p>
        </div>
      </div>

      <button
        @click="exportFile"
        class="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs bg-brand-600 text-white shadow hover:bg-brand-700 active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        <span>📥 Tải file JSON về máy</span>
      </button>
    </div>

    <!-- Import Panel -->
    <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
      <div class="flex items-center gap-3">
        <span class="text-2xl">📥</span>
        <div>
          <h2 class="text-base font-bold text-slate-900 dark:text-white">
            2. Nhập file tiến độ (Restore JSON)
          </h2>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Chọn tệp tin JSON đã sao lưu từ trước để khôi phục lại quá trình học
          </p>
        </div>
      </div>

      <!-- File picker -->
      <div>
        <input
          type="file"
          accept=".json,application/json"
          @change="onFileSelected"
          class="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-700 dark:file:bg-slate-800 dark:file:text-slate-300 hover:file:bg-slate-200"
        />
      </div>

      <!-- Or paste JSON text directly -->
      <div class="space-y-2">
        <label class="block text-xs font-semibold text-slate-500">
          Hoặc dán trực tiếp nội dung JSON vào đây:
        </label>
        <textarea
          v-model="pasteJsonText"
          rows="4"
          placeholder="Dán nội dung file JSON tại đây..."
          class="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-900 dark:text-slate-100 focus:outline-none"
        ></textarea>
        <button
          @click="importFromText"
          :disabled="!pasteJsonText.trim()"
          class="px-4 py-2 text-xs font-bold rounded-xl bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-40 transition-all"
        >
          Nhập từ nội dung văn bản
        </button>
      </div>

      <div v-if="importMessage" class="p-3 rounded-xl text-xs font-semibold" :class="importSuccess ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'">
        {{ importMessage }}
      </div>
    </div>

    <!-- Reset Data Warning Area -->
    <div class="p-5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div>
        <h3 class="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
          Xóa toàn bộ dữ liệu học tập
        </h3>
        <p class="text-xs text-rose-700/80 dark:text-rose-400 mt-0.5">
          Khôi phục ứng dụng về trạng thái ban đầu chưa có tiến độ.
        </p>
      </div>

      <button
        @click="confirmReset"
        class="px-4 py-2 text-xs font-bold rounded-xl bg-rose-600 text-white hover:bg-rose-700 active:scale-95 transition-all shrink-0"
      >
        🗑️ Đặt lại từ đầu
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useProgressStore } from '../stores/progress';

const progressStore = useProgressStore();

const pasteJsonText = ref('');
const importMessage = ref('');
const importSuccess = ref(false);

function exportFile() {
  const json = progressStore.exportJSON();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `dw_progress_backup_${dateStr}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function onFileSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target?.result as string;
    if (content) {
      applyImport(content);
    }
  };
  reader.readAsText(file);
}

function importFromText() {
  applyImport(pasteJsonText.value);
}

function applyImport(jsonStr: string) {
  const ok = progressStore.importJSON(jsonStr);
  if (ok) {
    importSuccess.value = true;
    importMessage.value = '✓ Nhập dữ liệu thành công! Toàn bộ tiến độ đã được khôi phục.';
    pasteJsonText.value = '';
  } else {
    importSuccess.value = false;
    importMessage.value = '✗ File JSON không hợp lệ hoặc sai định dạng.';
  }
}

function confirmReset() {
  if (confirm('CẢNH BÁO: Thao tác này sẽ xóa toàn bộ các hộp Leitner và ghi chú của bạn. Bạn có chắc chắn muốn xóa?')) {
    progressStore.resetAll();
    alert('Đã xóa dữ liệu thành công!');
  }
}
</script>
