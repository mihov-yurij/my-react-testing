import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Импортируем userEvent
import UserProfile from './UserProfile';
import '@testing-library/jest-dom'; // Для расширенных матчеров, таких как toHaveTextContent


describe('UserProfile Component Pro', () => {
  
  test('matches snapshot', () => {
    const { asFragment } = render(<UserProfile name="Tester" />);
    // Создает папку __snapshots__ и следит за изменениями верстки
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders with custom name prop', () => {
    render(<UserProfile name="Alex" />);
    // Проверяем передачу пропса
    expect(screen.getByTestId('user-name')).toHaveTextContent('Welcome, Alex!');
  });

  test('counter increments with userEvent', async () => {
    const user = userEvent.setup(); // Инициализируем сессию пользователя
    render(<UserProfile />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/count is 0/i);

    // Имитируем реальный клик (с фокусом и событиями мыши)
    await user.click(button);
    
    expect(button).toHaveTextContent(/count is 1/i);
  });
});

