import { useState, useEffect } from 'react';
import { takeGuess } from '../../helper_functions/guessFunctions.js';

const Guess = ({code, attempts, setAttempts, setDisplay, hasWon, setHasWon, hasLost, setHasLost}) => {
  const [guess, setGuess] = useState([])
  const [feedback, setFeedback] = useState([0, 0, 0, 0]);
  const [hasSubmit, setHasSubmit] = useState(false)

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
    setAttempts(attempts + 1);
    let formattedGuess = guess.map((item) => Number(item));
    formattedGuess = formattedGuess.slice(0,4);
    const result = takeGuess(code, formattedGuess, attempts);
    if (result === true) {
      setHasWon(true);
    } else if (result === false) {
      setHasLost(true);
    } else {
      setFeedback(result);
    }
    setHasSubmit(true);
  }

  return (
    <div>
      <div className="guess">
        {code.map((item, index) => <input key={index} onChange={(event) => {handleInput(event, index)}}/>)}
      </div>
        {hasSubmit ? null : <button onClick={() => {handleAttempt(code, guess, attempts)}}>submit</button>}
      <div className="feedback">
        {feedback.map((item, index) => <div key={index}>{item}</div>)}
      </div>
    </div>
  )

}

export default Guess;