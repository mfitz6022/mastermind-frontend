const Options = ({ setDisplay, difficulty, setDifficulty }) => {
  const deleteMessage = 'If you would like to delete your mastermind profile, you can do so by clicking the delete button below.';
  const deleteWarning = 'WARNING: deleting your account will erase all your personal scores. These cannot be recovered once they are deleted.'

  return (
    <div>
      <div className="difficulty-container">
        <div className="current-difficulty">Current difficulty: {difficulty}</div>
        <div className="difficulty-button-container">Select difficulty:
          <button className="difficulty-button" onClick={() => setDifficulty('easy')}>Easy</button>
          <button className="difficulty-button" onClick={() => setDifficulty('medium')}>Medium</button>
          <button className="difficulty-button" onClick={() => setDifficulty('hard')}>Hard</button>
        </div>
      </div>
      <div className="delete-user-container">
        <div className="delete-user-message">{deleteMessage}</div>
        <div className="delete-user-warning">{deleteWarning}</div>
        <button className="delete-user-button">Delete</button>
      </div>
      <button className="main-menu-button" onClick={() => {setDisplay('MainMenu')}}>Return to Main Menu</button>
    </div>
  )
}

export default Options;