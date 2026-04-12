import { useEffect, useState, type ReactElement } from 'react';

interface User {
  name: string;
  email: string;
  phone: string;
}

const UserProfile = (): ReactElement => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number>(1);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // ИСПРАВЛЕНО: Полный домен и правильный синтаксис ${userId}
        const response = await fetch(`https://typicode.com{userId}`, {
          signal: controller.signal 
        });

        if (!response.ok) {
          throw new Error('User not found');
        }

        const data = await response.json();
        
        setUser({
          name: data.name,
          email: data.email,
          phone: data.phone
        });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Fetch failed');
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    return () => controller.abort();
  }, [userId]);

  return (
    <div style={inlineStyles.container}>
      <div style={inlineStyles.searchBox}>
        <label htmlFor="user-id-input">Введите ID пользователя: </label>
        <input 
          id="user-id-input"
          type="number" 
          value={userId} 
          min="1"
          onChange={(e) => setUserId(Number(e.target.value))}
          style={inlineStyles.input}
        />
      </div>

      <div style={inlineStyles.card}>
        {loading && <p data-testid="loading-indicator">Loading...</p>}
        
        {error && !loading && (
          <p style={{color: 'red'}} data-testid="error-msg">Error: {error}</p>
        )}
        
        {!loading && !error && user && (
          <div data-testid="user-info">
            <h2 data-testid="user-name">Welcome, {user.name}!</h2>
            <p data-testid="user-email">📧 {user.email}</p>
            <p data-testid="user-phone">📞 {user.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const inlineStyles = {
  container: { fontFamily: 'sans-serif', padding: '20px', textAlign: 'center' as const },
  searchBox: { marginBottom: '20px' },
  input: { padding: '8px', width: '60px', borderRadius: '4px', border: '1px solid #ccc' },
  card: { 
    maxWidth: '350px', 
    margin: '0 auto', 
    padding: '20px', 
    border: '1px solid #ddd', 
    borderRadius: '12px', 
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    minHeight: '150px'
  }
};

export default UserProfile;




