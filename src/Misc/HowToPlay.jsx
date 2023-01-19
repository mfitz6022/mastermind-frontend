const HowToPlay = ({ setDisplay }) => {
  return (
    <div className="how-to-play-container">
      <h1>How to Play</h1>
      <h4>How mastermind works</h4>
      <ul className="instruction-list">
        <li className="instruction-list-point">You will have 10 attempts to guess a four number long code</li>
        <li className="instruction-list-point">"Easy" mode codes consist of numbers between 0 and 7</li>
        <li className="instruction-list-point">"Medium" mode codes consist of numbers between 0 and 10</li>
        <li className="instruction-list-point">"Hard" mode codes consist of numbers between 0 and 13</li>
        <li className="instruction-list-point">Each additional attempt decreases your score by 10 points</li>
        <li className="instruction-list-point">After each attempt, you will recieve feedback on the attempt</li>
      </ul>
      <h4>Multiplayer</h4>
      <h6>This mastermind app enables players to play with friends or others in the community anywhere in the world.</h6>
      <p>To play Mastermind with others, navigate through the main menu to the "play online" option. After clicking on "play online" you should see a list of public and private rooms. Public rooms can be used by anyone, but private rooms require a password. Playerscan create a private room as well.</p>
      <button className="return-to-main-menu" onClick={() => {setDisplay('MainMenu')}}>Return to Main Menu</button>
    </div>
  )
}

export default HowToPlay;