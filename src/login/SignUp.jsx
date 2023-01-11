import { useState } from 'react';
import InputFields from './InputFields.jsx';
import { createUser } from '../helper_functions/httpRequests.js';

// Must add client side input validation
const SignUp = ({setHasAccount}) => {
  const [createUsername, setCreateUsername] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSignUp = async () => {
    try {
      const { data } = await createUser(createUsername, createPassword);
      console.log(data);
      setHasAccount(true);
      if (isError) {
        setIsError(false);
      }
    } catch (err) {
      setIsError(true)
      console.log(err);
    }
  }

  return (
    <div>
      <InputFields setUsername={setCreateUsername} setPassword={setCreatePassword} />
      {isError
        ? <div>credentials were invalid or username already exists</div>
        : null
      }
      <button className="sign-up button" onClick={handleSignUp}>
        Sign Up!
      </button>
      <div>Already have an account?</div>
      <button onClick={() => {setHasAccount(true)}}>
        Go to Sign in
      </button>
    </div>
  )
}

export default SignUp