import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // 1. Включаем глобальные переменные (describe, it, expect)
    globals: true, 
    
    // 2. Имитация браузера
    environment: 'jsdom', 
    
    // 3. ВАЖНО: Подключаем файл инициализации (теперь без комментариев)
    setupFiles: './src/setupTests.ts', 
    
    // 4. Настройка путей
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    exclude: ['node_modules'],
    
    // 5. Настройка отчетов о покрытии
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'node_modules', 
        'src/main.tsx', 
        'src/vite-env.d.ts', 
        '**/*.test.tsx'
      ],
    },
  },
});
