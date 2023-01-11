const InputFields = ( {setUsername, setPassword} ) => {
  const userString = 'Input a username...';
  const passString = 'Input a password...';

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  return (
    <div>
      <div>Please enter a username in the space below</div>
      <input className="input-username" placeholder={userString} onChange={handleUsernameChange}/>
      <div>Please enter a username in the space below</div>
      <input className="input-password" placeholder={passString} onChange={handlePasswordChange}/>
    </div>
  )
};

export default InputFields;
