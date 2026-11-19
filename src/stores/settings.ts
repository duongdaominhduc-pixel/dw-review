import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    darkMode: false,
    fontSize: 'normal' as 'normal' | 'large',
  }),

  actions: {
    initTheme() {
      const saved = localStorage.getItem('dw_theme_dark');
      if (saved !== null) {
        this.darkMode = saved === 'true';
      } else {
        this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      this.applyTheme();
    },

    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('dw_theme_dark', String(this.darkMode));
      this.applyTheme();
    },

    applyTheme() {
      if (this.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },
});
