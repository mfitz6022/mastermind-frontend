import { useState } from 'react';
import InputFields from './InputFields.jsx';
import SignUp from './SignUp.jsx';
import { loginUser } from '../helper_functions/httpRequests.js';

// Must add client side input validation
const SignIn = ({ setIsLoggedIn }) => {
  const [hasAccount, setHasAccount] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSignIn = async () => {
    try {
      const { data } = await loginUser(username, password);
      if (data === true) {
        setIsLoggedIn(true);
      } else {
        setIsError(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {hasAccount
        ? <div>
            <InputFields setUsername={setUsername} setPassword={setPassword} />
            {isError
              ? <div>invalid username or password</div>
              : null
            }
            <button className="sign-in" onClick={handleSignIn}>
              Sign In!
            </button>
            Don't have an account?
            <button className="dont-have-account" onClick={() => {setHasAccount(false)}}>
              Sign Up!
            </button>
          </div>
        : <SignUp setHasAccount={setHasAccount} />
      }
    </div>
  )
}

export default SignIn;