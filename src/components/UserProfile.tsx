import { useState } from 'react';

interface UserProfileProps {
  name?: string;
}

const UserProfile = ({ name = 'Guest' }: UserProfileProps) => {
  const [count, setCount] = useState(0);

  return (
    <div className="user-profile">
      <h1>Vite + React</h1>
      {/* Новое поле для теста пропсов */}
      <p data-testid="user-name">Welcome, {name}!</p>

      <div className="card">
        <button type="button" onClick={() => setCount((prev) => prev + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;

