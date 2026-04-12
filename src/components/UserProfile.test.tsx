import { render, screen, fireEvent } from '@testing-library/react';
import UserProfile from './UserProfile';

const fetchMock = vi.fn() as any;
vi.stubGlobal('fetch', fetchMock);

describe('UserProfile Component', () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  it('отображает индикатор загрузки при начале запроса', async () => {
    fetchMock.mockReturnValue(new Promise(() => {})); 

    render(<UserProfile />);
    
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('загружает нового пользователя при изменении ID', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: 'User 2', email: '2@test.com', phone: '222' }),
    } as Response);

    render(<UserProfile />);

    const input = screen.getByLabelText(/Введите ID пользователя/i);
    fireEvent.change(input, { target: { value: '2' } });

    const newUser = await screen.findByText(/Welcome, User 2!/i);
    expect(newUser).toBeInTheDocument();
  });
  it('отображает ошибку, если пользователь не найден', async () => {
  fetchMock.mockResolvedValueOnce({
    ok: false,
    status: 404
  } as Response);

  render(<UserProfile />);

 
  const errorMsg = await screen.findByTestId('error-msg');
  expect(errorMsg).toHaveTextContent(/Error: User not found/i);  
   expect(screen.queryByTestId('user-info')).not.toBeInTheDocument();
});

});




