import { useState } from 'react';
import SignIn from './login/SignIn.jsx';
import MainMenu from './menu/MainMenu.jsx';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  return (
    <div className="App">
      <div className="title">MASTERMIND</div>
      {!isLoggedIn
        ? <SignIn className="sign-in" setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser}/>
        : <MainMenu className="main-menu" isLoggedIn={isLoggedIn} user={user}/>
      }
    </div>
  );
}

export default App;


