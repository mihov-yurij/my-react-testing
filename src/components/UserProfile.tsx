import React, { useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  phone: string;
}

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
      try {
   const response = await fetch(`https://typicode.com{userId}`);

        
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data = await response.json();
        setUser(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div data-testid="loading-indicator">Loading...</div>;
  if (error) return <div data-testid="error-msg" style={{ color: 'red' }}>Error: {error}</div>;
  if (!user) return null;

  return (
    <div data-testid="user-info" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginTop: '20px', display: 'inline-block' }}>
      <h2>Welcome, {user.name}!</h2>
      <p>📧 {user.email}</p>
      <p>📞 {user.phone}</p>
    </div>
  );
};

export default UserProfile;


