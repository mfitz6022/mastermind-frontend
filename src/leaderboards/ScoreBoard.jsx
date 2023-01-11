const ScoreBoard = ({ scoreData }) => {
  return (
    <div className="score-board">
      {scoreData.map((item, index) => <div key={index}>
        <div>{item.username}</div>
        <div>{item.difficulty}</div>
        <div>{item.time_elapsed}</div>
        <div>{item.attempts}</div>
        <div>{item.hints_used}</div>
      </div>)}
    </div>
  );
}

export default ScoreBoard;