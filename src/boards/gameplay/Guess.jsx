import { useState, useEffect } from 'react';
import { takeGuess } from '../../helper_functions/guessFunctions.js';
import socket from '../../helper_functions/sockets.js';

const Guess = ({code, attempts, setAttempts, setDisplay, hasWon, setHasWon, hasLost, setHasLost, roomData}) => {
  const [guess, setGuess] = useState([])
  const [feedback, setFeedback] = useState([0, 0, 0, 0]);
  const [hasSubmit, setHasSubmit] = useState(false)

  useEffect((attempts) => {
    console.log(`attempts => ${attempts}`);
    code.forEach((item) => { setGuess(guess => [...guess, 0])})
  },[code]);

  socket.on('receive_input', (inputData) => {
    console.log(`input received: ${inputData}`);
    setGuess(inputData);
  })

  const handleOnlineInput = (roomData, playerInput) => {
    console.log(playerInput);
    const inputData = {
      room: roomData,
      input: playerInput
    }
    socket.emit('transmit_input', inputData);
  }

  const handleInput = async (event, index) => {
    let newArray = guess;
    let playerInput = event.target.value;
    newArray[index] = playerInput;
    newArray = newArray.slice(0, 4);
    await setGuess(newArray);
    if (roomData) {
      handleOnlineInput(roomData, guess);
    }
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
        <div>
          {guess.map((item, index) => <div key={index}>{item}</div>)}
        </div>
        <div>
          {code.map((item, index) => <input key={index} onChange={(event) => {handleInput(event, index)}}/>)}
        </div>
      </div>
        {hasSubmit ? null : <button onClick={() => {handleAttempt(code, guess, attempts)}}>submit</button>}
      <div className="feedback">
        {feedback.map((item, index) => <div key={index}>{item}</div>)}
      </div>
    </div>
  )

}

export default Guess;