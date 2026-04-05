// import { describe, test, expect } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'; // Импортируем userEvent
// import  UserProfile  from './UserProfile';
// import '@testing-library/jest-dom'; // Для расширенных матчеров, таких как toHaveTextContent


// describe('UserProfile Component', () => {
  
//   test('matches snapshot', () => {
//     const { asFragment } = render(<UserProfile name="Tester" />);
//     // Создает папку __snapshots__ и следит за изменениями верстки
//     expect(asFragment()).toMatchSnapshot();
//   });

//   test('renders with custom name prop', () => {
//     render(<UserProfile name="Alex" />);
//     // Проверяем передачу пропса
//     expect(screen.getByTestId('user-name')).toHaveTextContent('Welcome, Alex!');
//   });

//   test('counter increments with userEvent', async () => {
//     const user = userEvent.setup(); // Инициализируем сессию пользователя
//     render(<UserProfile />);
    
//     const button = screen.getByRole ('button');
//     expect(button).toHaveTextContent(/count is 0/i);

//     // Имитируем реальный клик (с фокусом и событиями мыши)
//     await user.click(button);
    
//     expect(button).toHaveTextContent(/count is 1/i);
//   });
// });

import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import UserProfile from './UserProfile';

// 1. Настраиваем перехватчик сетевых запросов
const server = setupServer(
  http.get('https://jsonplaceholder.typicode.com/users/1', () => {
    return HttpResponse.json({
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      phone: '1-770-736-8031',
    });
  })
);

// 2. Жизненный цикл сервера
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserProfile Async', () => {
  test('renders loading state initially', () => {
    render(<UserProfile />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders user data after fetch', async () => {
    render(<UserProfile />);
    
    // Используем findBy... (он ждет появления элемента до 1000мс)
    const userName = await screen.findByTestId('user-name');
    
    expect(userName).toHaveTextContent('Welcome, Leanne Graham!');
    expect(screen.getByText(/Sincere@april.biz/i)).toBeInTheDocument();
  });

  test('renders error message on failure', async () => {
    // Переопределяем ответ сервера на ошибку только для этого теста
    server.use(
      http.get('https://jsonplaceholder.typicode.com/users/1', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<UserProfile />);

    const errorMsg = await screen.findByText(/error: network response was not ok/i);
    expect(errorMsg).toBeInTheDocument();
  });
});
