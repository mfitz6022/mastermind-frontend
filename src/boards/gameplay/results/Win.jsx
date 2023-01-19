import { useEffect } from 'react';
import { createUserScores } from '../../../helper_functions/httpRequests.js';

const Win = ({ user, stopTime, setStopTime, code, difficulty, score, attempts, time, setDisplay }) => {
  const formatTime = `${('0' + Math.floor((time / 3600000) % 100)).slice(-2)}:${('0' + Math.floor((time / 60000) % 60)).slice(-2)}:${('0' + Math.floor((time / 1000) % 60)).slice(-2)}`;

  useEffect(() => {
    setStopTime(true);
    console.log('difficulty: ' + difficulty);
    console.log('user: ' + user);
    console.log('time' + formatTime);
    createUserScores(user, difficulty, formatTime, attempts, score);
  },[]);

  return (
    <div className="results-page">
      <div className="game-win">Congradulations!</div>
      <div className="game-win-message">You guessed the correct code</div>
      <div className="game-results">
        <div className="result">correct code: {code}</div>
        <div className="result">total score: {score}</div>
        <div className="result">total attempts: {attempts}</div>
        <div className="result">time elapsed:
          <div>{formatTime}</div>
        </div>
      </div>
      <button className="return-to-main-menu" onClick={() => {setDisplay('MainMenu')}}>Return to Main Menu</button>
    </div>
  )
}

export default Win;