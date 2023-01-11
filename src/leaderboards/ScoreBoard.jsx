const ScoreBoard = ({ scoreData, setDisplay }) => {
  return (
    <div className="score-board">
      {scoreData.map((item, index) => <div key={index}>
        <div>{item.username}</div>
        <div>{item.difficulty}</div>
        <div>{item.time_elapsed}</div>
        <div>{item.attempts}</div>
        <div>{item.hints_used}</div>
      </div>)}
      <div>
        <button className="return-to-menu" onClick={() => {setDisplay('MainMenu')}}>Return to Main Menu</button>
      </div>
    </div>
  );
}

export default ScoreBoard;