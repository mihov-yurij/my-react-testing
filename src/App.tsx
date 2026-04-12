import { useState } from 'react'; // Импортируем хук для состояния
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  // 1. Создаем состояние для ID пользователя (по умолчанию 1)
  const [userId, setUserId] = useState<number>(1);

  return (
    <div className="App">
      <h1>Simple App</h1>
      
      <div className="input-container">
        <label>Введите ID пользователя:</label>
        <input 
          type="number" 
          value={userId} 
          onChange={(e) => setUserId(Number(e.target.value))} 
          min="1"
        />
      </div>

      {/* Передаем актуальный userId в компонент */}
      <UserProfile userId={userId} />
    </div>
  );
}

export default App;

