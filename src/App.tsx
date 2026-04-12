import { useState } from 'react'; 
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  
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

     
      <UserProfile userId={userId} />
    </div>
  );
}

export default App;

