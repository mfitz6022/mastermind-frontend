const Lose = ({ code, setDisplay }) => {
  return (
    <div className="lose-page">
      <div className="game-over">Game Over!</div>
      <button className="main-menu" onClick={() => setDisplay('MainMenu')}>Return to Main Menu</button>
    </div>
  )
}

export default Lose;