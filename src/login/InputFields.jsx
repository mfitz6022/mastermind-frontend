const InputFields = ( {setUsername, setPassword} ) => {
  const userString = 'Input a username...';
  const passString = 'Input a password...';

  const handleUsernameChange = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  }

  return (
    <div>
      <div className="input-username-title">Please enter a username in the space below</div>
      <input className="input-username" placeholder={userString} onChange={handleUsernameChange}/>
      <div className="input-password-title">Please enter a password in the space below</div>
      <input className="input-password" type="password" placeholder={passString} onChange={handlePasswordChange}/>
    </div>
  )
};

export default InputFields;
