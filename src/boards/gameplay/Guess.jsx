import { useState, useEffect } from 'react';
import { takeGuess } from '../../helper_functions/guessFunctions.js';
import socket from '../../helper_functions/sockets.js';
import { guessSchema } from '../../schemas.js';

const Guess = ({index, code, attempts, score, setScore, setAttempts, setDisplay, hasWon, setHasWon, hasLost, setHasLost, roomData}) => {
  const [guess, setGuess] = useState([])
  const [feedback, setFeedback] = useState([0, 0, 0, 0]);
  const [hasSubmit, setHasSubmit] = useState(false);
  const [inputValidation, setInputValidation] = useState(true);

  const attemptData = {
    roomData: roomData,
    index: index
  }

  const inputData = {
    roomData: roomData,
    index: index,
    input: guess
  }

  useEffect((attempts) => {
    console.log(`attempts => ${attempts}`);
    code.forEach((item) => { setGuess(guess => [...guess, 0])})
  },[code]);

  socket.on('receive_input', (inputData) => {
    if (inputData.index === index) {
      setGuess(inputData.input);
    }
  })

  const handleOnlineInput = (index, event, roomData) => {
    if (roomData) {
      socket.emit('transmit_input', inputData);
    }
  }

  const handleInput = async (event, index) => {
    event.preventDefault();
    const inputObject = {
      input: event.target.value
    };
    const isValid = await guessSchema.isValid(inputObject);

    if (isValid) {
      setInputValidation(true);
      let newArray = guess;
      newArray[index] = event.target.value;
      newArray = newArray.slice(0, 4);
      setGuess(newArray);
    } else{
      setInputValidation(false);
    }
  }

  const handleAttempt = (code, guess, attempts, index) => {
    setAttempts(attempts + 1);
    let formattedGuess = guess.map((item) => Number(item));
    formattedGuess = formattedGuess.slice(0,4);
    const result = takeGuess(code, formattedGuess, attempts);
    if (result === true) {
      setHasWon(true);
    } else if (result === false) {
      setScore(score - 10);
      setHasLost(true);
    } else {
      setScore(score - 10);
      setFeedback(result);
    }
    setHasSubmit(true);
  }

  const handleOnlineAttempt = (attemptData) => {
    if (attemptData.roomData) {
      socket.emit('send_attempt', attemptData)
    }
  }

  socket.on('receive_attempt', (attemptData) => {
    if (attemptData.index === index) {
      handleAttempt(code, guess, attempts, index);
    }
  })

  return (
    <div className="guess">
      <div>
        <div className="guess-display-container">
          {guess.map((item, index) => <div className="guess-display" key={index}>{item}</div>)}
        </div>
        <div className="guess-input-container">
          {hasSubmit ? null : code.map((item, index) => <input className="guess-input" key={index} onChange={async (event) => {await handleInput(event, index); handleOnlineInput(index, event, roomData)}}/>)}
        </div>
        <div className="valid-input">
          {inputValidation
            ? null
            : <div>invalid input. please input a a valid number</div>
          }
        </div>
      </div>
        {hasSubmit ? null : <button className="guess-submit" onClick={() => {handleAttempt(code, guess, attempts); handleOnlineAttempt(attemptData)}}>submit</button>}
      <div className="guess-feedback-container">
        <div className="guess-results">Guess results: </div>
        {feedback.map((item, index) => <div className="guess-feedback" key={index}>{item}</div>)}
      </div>
    </div>
  )

}

export default Guess;