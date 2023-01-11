import { useState, useEffect } from 'react';
import { takeGuess } from '../../helper_functions/guessFunctions.js';
import Win from './results/Win.jsx';
import Lose from './results/Lose.jsx';

const Guess = ({code, attempts, setAttempts}) => {
  const [guess, setGuess] = useState([])
  const [feedback, setFeedback] = useState([0, 0, 0, 0]);
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);

  useEffect((attempts) => {
    console.log(`attempts => ${attempts}`);
    code.forEach((item) => { setGuess(guess => [...guess, 0])})
  },[code]);

  const handleInput = (event, index) => {
    const newArray = guess;
    console.log(event.target.value);
    newArray[index] = event.target.value;
    setGuess(newArray);
  }

  const handleAttempt = (code, guess, attempts) => {
    let formattedGuess = guess.map((item) => Number(item));
    formattedGuess = formattedGuess.slice(0,4);
    setAttempts(attempts + 1);
    const result = takeGuess(code, formattedGuess, attempts);
    if (result === true) {
      setHasWon(true);
    } else if (result === false) {
      setHasLost(true);
    } else {
      setFeedback(result);
    }
  }

  if (hasWon) {
    return (
      <Win code={code} />
    )
  } else if (hasLost) {
    return (
      <Lose code={code} />
    )
  } else {
    return (
      <div>
        <div className="attempts">{`attempts: ${attempts}`}</div>
        <div className="guess">
          {code.map((item, index) => <input key={index} onChange={(event) => {handleInput(event, index)}}/>)}
        </div>
        <button onClick={() => {handleAttempt(code, guess, attempts)}}>submit</button>
        <div className="feedback">
          {feedback.map((item, index) => <div key={index}>{item}</div>)}
        </div>
      </div>
    )
  }
}

export default Guess;