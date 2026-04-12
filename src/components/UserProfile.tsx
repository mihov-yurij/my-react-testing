// import React, { useState, useEffect } from 'react';

// interface UserProfileProps {
//   userId: number;
// }

// interface User {
//   name: string;
//   email: string;
//   phone: string;
// }

// const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // ИСПРАВЛЕННЫЙ URL: добавлен jsonplaceholder и использованы обратные кавычки ``
//         const response = await fetch(`https://typicode.com{userId}`);
        
//         if (!response.ok) {
//           throw new Error('Пользователь не найден');
//         }
        
//         const data = await response.json();
//         setUser(data);
//       } catch (err: any) {
//         // Если API недоступно или URL неверный, выводим понятную ошибку
//         setError(err.message === 'Failed to fetch' ? 'Ошибка сети или неверный адрес' : err.message);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [userId]);

//   if (loading) return <div className="loading-text">Загрузка данных...</div>;
//   if (error) return <div style={{ color: 'red', marginTop: '20px' }}>Ошибка: {error}</div>;
//   if (!user) return null;

//   return (
//     <div className="user-card">
//       <h2>Welcome, {user.name}!</h2>
//       <div className="user-info">
//         <span>📧</span> {user.email}
//       </div>
//       <div className="user-info">
//         <span>📞</span> {user.phone}
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


import React, { useState, useEffect } from 'react';

// Интерфейс данных пользователя
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

// Интерфейс пропсов компонента
interface UserProfileProps {
  userId: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Абортируем запрос, если userId изменился слишком быстро
    const controller = new AbortController();

    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://typicode.com{userId}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(response.status === 404 ? 'Пользователь не найден' : 'Ошибка сервера');
        }

        const data: User = await response.json();
        setUser(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Произошла непредвиденная ошибка');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();

    return () => controller.abort(); // Очистка при размонтировании
  }, [userId]);

  if (isLoading) {
    return <div className="loading-text" data-testid="loading-indicator">Загрузка данных...</div>;
  }

  if (error) {
    return (
      <div className="error-msg" data-testid="error-msg" style={{ color: '#d9534f', marginTop: '20px' }}>
        <strong>Ошибка:</strong> {error}
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

