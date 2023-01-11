import { useState } from 'react';
import SignIn from './login/SignIn.jsx';
import MainMenu from './menu/MainMenu.jsx';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  // const [display, setDisplay] = useState('SignIn')

  return (
    <div className="App">
      {!isLoggedIn
        ? <SignIn className="sign-in" setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>
        : <MainMenu className="main-menu" isLoggedIn={isLoggedIn} user={user}/>
      }
    </div>
  );
}

export default App;


