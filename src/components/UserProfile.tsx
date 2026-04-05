import { useEffect, useState } from 'react';

// Описываем структуру данных от API
interface User {
  name: string;
  email: string;
  phone: string;
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number>(1); // Состояние для поиска по ID

  useEffect(() => {
    const controller = new AbortController();

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        // Имитируем задержку интернета (500 мс)
        await new Promise(resolve => setTimeout(resolve, 500));

        // Локальные данные вместо fetch
        const mockUsers: Record<number, User> = {
          1: { name: "Yurij Mihov", email: "mihov.yurij@gmail.com", phone: "+38 067 485 35 67" },
          2: { name: "Julia Navrozova", email: "yuliana.docent@gmail.com", phone: "+38 067 904 59 69" },
          3: { name: "Clementine Bauch", email: "nathan@yesenia.net", phone: "1-463-123-4447" },
        };

        const foundUser = mockUsers[userId];

        if (foundUser) {
          setUser(foundUser);
        } else {
          throw new Error('Пользователь не найден в локальной базе (введите 1, 2 или 3)');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };









//     const fetchUser = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // ИСПРАВЛЕНО: Правильный путь /api/users/ и знак $
//       const response = await fetch(`https://reqres.in{userId}`, {
//   signal: controller.signal 
// });

        
//         if (!response.ok) {
//           throw new Error('Пользователь не найден');
//         }
        
//         const result = await response.json();
        
//         // ВАЖНО: У reqres.in данные лежат в поле .data
//         // Поэтому мы берем result.data
//     setUser({
//           name: `${result.data.first_name} ${result.data.last_name}`,
//           email: result.data.email,
//           phone: "No phone in this API" // В этом API нет телефона
//         });

//       } catch (err) {
//         if (err instanceof Error && err.name !== 'AbortError') {
//           setError(err.message === 'Failed to fetch' 
//             ? 'Ошибка сети или CORS' 
//             : err.message);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };


    fetchUser();

    // Очистка: отменяем запрос, если ID изменился слишком быстро
    return () => controller.abort();
  }, [userId]); 

  return (
    <div style={styles.container}>
      {/* Поле ввода ID */}
      <div style={styles.searchBox}>
        <label>Введите ID пользователя (1-10): </label>
        <input 
          type="number" 
          value={userId} 
          min="1" 
          max="15"
          onChange={(e) => setUserId(Number(e.target.value))}
          style={styles.input}
        />
      </div>

      {/* Карточка профиля */}
      <div style={styles.card}>
        {loading && <p>Загрузка...</p>}
        {error && <p style={{color: 'red'}}>{error}</p>}
        
        {!loading && !error && user && (
          <>
            {/* Аватарка берет первую букву имени */}
            <div style={styles.avatar}>{user.name[0]}</div>
            <h2 data-testid="user-name" style={styles.name}>{user.name}</h2>
            <p style={styles.info}>📧 {user.email}</p>
            <p style={styles.info}>📞 {user.phone}</p>
          </>
        )}
      </div>
    </div>
  );
};

// Стили объекта (Junior+ подход для небольших компонентов)
const styles = {
  container: { 
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', 
    padding: '40px', 
    textAlign: 'center' as const 
  },
  searchBox: { 
    marginBottom: '30px' 
  },
  input: { 
    padding: '10px', 
    borderRadius: '8px', 
    border: '2px solid #007bff', 
    width: '70px',
    fontSize: '16px',
    outline: 'none'
  },
  card: {
    maxWidth: '350px', 
    margin: '0 auto', 
    padding: '30px',
    borderRadius: '20px', 
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    backgroundColor: '#ffffff', 
    border: '1px solid #f0f0f0'
  },
  avatar: {
    width: '80px', 
    height: '80px', 
    borderRadius: '50%', 
    backgroundColor: '#007bff',
    color: 'white', 
    fontSize: '32px', 
    lineHeight: '80px', 
    margin: '0 auto 20px',
    fontWeight: 'bold'
  },
  name: { 
    margin: '0 0 10px', 
    color: '#222',
    fontSize: '24px'
  },
  info: { 
    margin: '8px 0', 
    color: '#555', 
    fontSize: '15px' 
  }
};

export default UserProfile;






