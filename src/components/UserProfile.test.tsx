import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import UserProfile from './UserProfile';
import '@testing-library/jest-dom';

const server = setupServer(
  // Используем :id для перехвата любых ID
  http.get('https://typicode.com', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      phone: '1-770-736-8031',
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserProfile Component', () => {
  test('отображает данные пользователя после успешной загрузки', async () => {
    render(<UserProfile />);

    // Ждем исчезновения лоадера и появления данных
    const userName = await screen.findByTestId('user-name');
    
    expect(userName).toHaveTextContent(/Leanne Graham/i);
    expect(screen.getByTestId('user-email')).toHaveTextContent(/Sincere@april.biz/i);
  });

  test('отображает ошибку при 404 или 500', async () => {
    server.use(
      http.get('https://typicode.com*', () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    render(<UserProfile />);

    const errorMsg = await screen.findByTestId('error-msg');
    expect(errorMsg).toHaveTextContent(/User not found/i);
  });
});






