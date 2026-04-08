import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest'; // Явный импорт из vitest
import UserProfile from './UserProfile';
import '@testing-library/jest-dom';

// В Vitest используется 'vi' вместо 'jest'
const mockFetch = vi.spyOn(window, 'fetch');

describe('UserProfile Component', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('отображает данные пользователя после успешной загрузки', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        name: 'Ivan Petrov',
        email: 'ivan@test.com',
        phone: '123-456'
      }),
    } as Response);

    render(<UserProfile />);

    const userName = await screen.findByTestId('user-name');
    expect(userName).toHaveTextContent('Welcome, Ivan Petrov!');
    expect(screen.getByTestId('user-email')).toHaveTextContent('ivan@test.com');
  });

  it('загружает нового пользователя при смене ID', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ name: 'User 1', email: '1@test.com', phone: '111' }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ name: 'User 2', email: '2@test.com', phone: '222' }),
      } as Response);

    render(<UserProfile />);

    await screen.findByText(/Welcome, User 1!/i);

    const input = screen.getByLabelText(/Введите ID пользователя/i);
    fireEvent.change(input, { target: { value: '2' } });

    const newUser = await screen.findByText(/Welcome, User 2!/i);
    expect(newUser).toBeInTheDocument();
  });
});

