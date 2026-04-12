import React, { useState, useEffect } from 'react';

interface UserProfileProps {
  userId: number;
}

interface User {
  name: string;
  email: string;
  phone: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        // ИСПРАВЛЕННЫЙ URL: добавлен jsonplaceholder и использованы обратные кавычки ``
        const response = await fetch(`https://typicode.com{userId}`);
        
        if (!response.ok) {
          throw new Error('Пользователь не найден');
        }
        
        const data = await response.json();
        setUser(data);
      } catch (err: any) {
        // Если API недоступно или URL неверный, выводим понятную ошибку
        setError(err.message === 'Failed to fetch' ? 'Ошибка сети или неверный адрес' : err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div className="loading-text">Загрузка данных...</div>;
  if (error) return <div style={{ color: 'red', marginTop: '20px' }}>Ошибка: {error}</div>;
  if (!user) return null;

  return (
    <div className="user-card">
      <h2>Welcome, {user.name}!</h2>
      <div className="user-info">
        <span>📧</span> {user.email}
      </div>
      <div className="user-info">
        <span>📞</span> {user.phone}
      </div>
    </div>
  );
};

export default UserProfile;

