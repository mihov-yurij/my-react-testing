import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Дозволяє використовувати глобальні змінні, такі як `describe`, `test`, `expect` без імпорту
    environment: 'jsdom', // Використовує jsdom для імітації браузерного середовища
    // setupFiles: './src/setupTests.ts',
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'], // Вказує, де шукати тестові файли
    exclude: ['node_modules'], // Виключає тестування в node_modules
    coverage: {
      provider: 'v8', // Використовує V8 для збору покриття коду
      reporter: ['text', 'json', 'html'], // Формати звітів
      include: ['src/**/*.{js,jsx,ts,tsx}'], // Вказує, які файли враховувати для покриття
      exclude: ['node_modules', 'tests'], // Вказує, які файли ігнорувати
    },
  },
});
