const ScoreBoard = ({ scoreData, setDisplay, isGlobal }) => {

  return (
    <div className="score-board">
      {scoreData.map((item, index) =>
      <div key={index} className="score-board-container">
          {isGlobal
            ? <div className="score-board-item username">user: {item.username}</div>
            : null
          }
          <div className="score-board-item score">score: {item.score}</div>
          <div className="score-board-item difficulty">difficulty: {item.difficulty}</div>
          <div className="score-board-item time">time: {item.time}</div>
          <div className="score-board-item attempts">attempts: {item.attempts}</div>
      </div>)}
      <div>
        <button className="return-to-main-menu" onClick={() => {setDisplay('MainMenu')}}>Return to Main Menu</button>
      </div>
    </div>
  );
}

export default ScoreBoard;