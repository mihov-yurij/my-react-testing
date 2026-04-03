import { useState } from 'react';

/**
 * Компонент профиля пользователя со счетчиком.
 * Демонстрирует работу с состоянием и статическим контентом.
 */
const UserProfile = () => {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className="user-profile">
      {/* Тест ищет этот текст через getByText(/Vite \+ React/i) */}
      <h1>Vite + React</h1>

      <div className="card">
        <p>Кликните на кнопку ниже, чтобы изменить состояние:</p>
        
        {/* Тест ищет эту кнопку через getByRole('button') 
            и проверяет текст 'count is X' */}
        <button 
          type="button" 
          onClick={handleIncrement}
        >
          count is {count}
        </button>
      </div>

      <p className="read-the-docs">
        Проверка работы тестов Vitest + React Testing Library
      </p>
    </div>
  );
};

export default UserProfile;
