import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';
import { vi, describe, it, expect, beforeEach, type Mock } from 'vitest';
import '@testing-library/jest-dom/vitest';

// 1. Правильно типизируем fetchMock
const fetchMock = vi.fn() as Mock;
vi.stubGlobal('fetch', fetchMock);

describe('UserProfile Component', () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  it('отображает индикатор загрузки при начале запроса', () => {
    fetchMock.mockReturnValue(new Promise(() => {})); 

    render(<UserProfile userId={1} />);
    
    // Ищем русский текст, так как в UserProfile.tsx у нас "Загрузка данных..."
    expect(screen.getByText(/Загрузка данных.../i)).toBeInTheDocument();
  });

  it('загружает и отображает данные пользователя', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ 
        name: 'Leanne Graham', 
        email: 'Sincere@april.biz', 
        phone: '1-770-736-8031' 
      }),
    });

    render(<UserProfile userId={1} />);

    // Ждем появления заголовка
    const welcomeMsg = await screen.findByText(/Welcome, Leanne Graham!/i);
    expect(welcomeMsg).toBeInTheDocument();
    expect(screen.getByText(/Sincere@april.biz/i)).toBeInTheDocument();
  });

  it('отображает ошибку, если пользователь не найден', async () => {
    fetchMock.mockResolvedValueOnce({ ok: false });

    render(<UserProfile userId={999} />);

    // Ищем русский текст ошибки из твоего UserProfile.tsx
    const errorMsg = await screen.findByText(/Ошибка: Пользователь не найден/i);
    expect(errorMsg).toBeInTheDocument();
  });
});

