const Win = ({ code, setDisplay }) => {
  return (
    <div className="lose-page">
      <div className="game-over">Congradulations! You guessed the correct code</div>
      <button className="main-menu" onClick={() => {setDisplay('MainMenu')}}>Return to Main Menu</button>
    </div>
  )
}

export default Win;