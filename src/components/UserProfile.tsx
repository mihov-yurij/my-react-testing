import React, { useState, useEffect } from 'react';

// Типизация данных пользователя
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

// Типизация пропсов компонента
interface UserProfileProps {
  userId: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      
      // Используем AbortController для предотвращения race condition
      const controller = new AbortController();
      const signal = controller.signal;

      try {
        // ИСПРАВЛЕНО: Полный URL, обратные кавычки и правильный путь /users/
        const response = await fetch(`https://typicode.com{userId}`, { signal });
        
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}. Пользователь не найден`);
        }
        
        const data: User = await response.json();
        setUser(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Не удалось загрузить данные');
        }
      } finally {
        setLoading(false);
      }

      return () => controller.abort();
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <div className="loading-text" data-testid="loading-indicator">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-msg" data-testid="error-msg" style={{ color: 'red', marginTop: '20px' }}>
        Ошибка: {error}
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="user-card" data-testid="user-info">
      <h2>Welcome, {user.name}!</h2>
      <div className="user-info">
        <span>📧</span> <strong>Email:</strong> {user.email}
      </div>
      <div className="user-info">
        <span>📞</span> <strong>Phone:</strong> {user.phone}
      </div>
      <div className="user-info">
        <span>🌐</span> <strong>Website:</strong> {user.website}
      </div>
    </div>
  );
};

export default UserProfile;
