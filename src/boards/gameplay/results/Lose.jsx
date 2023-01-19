import { useEffect } from 'react';

const Lose = ({ user, stopTime, setStopTime, code, difficulty, score, attempts, time, setDisplay }) => {
  const formatTime = `${('0' + Math.floor((time / 3600000) % 100)).slice(-2)}:${('0' + Math.floor((time / 60000) % 60)).slice(-2)}:${('0' + Math.floor((time / 1000) % 60)).slice(-2)}`;

  useEffect(() => {
    setStopTime(true);
  },[]);


  return (
    <div className="results-page">
      <div className="game-lose">Game Over!</div>
      <div className="game-lose-message">You ran out of attempts</div>
      <div className="game-results">
        <div className="result">correct code: {code}</div>
        <div className="result">total score: {score}</div>
        <div className="result">total attempts: {attempts}</div>
        <div className="result">time elapsed: {formatTime}</div>
      </div>
      <button className="return-to-main-menu" onClick={() => {setDisplay('MainMenu')}}>Return to Main Menu</button>
    </div>
  )
}

export default Lose;