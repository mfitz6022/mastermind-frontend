import { useState, useEffect } from 'react';
import { randomNumberEasy, randomNumberMed, randomNumberHard } from '../helper_functions/httpRequests.js';
import socket from '../helper_functions/sockets.js';
import Guess from './gameplay/Guess.jsx';
import Win from './gameplay/results/Win.jsx';
import Lose from './gameplay/results/Lose.jsx';

const Board = ({ difficulty, setDifficulty, setDisplay, isConnected, roomData, user }) => {
  const [time,setTime] = useState(0);
  const [stopTime, setStopTime] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(100);
  const [code, setCode] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);

  const handleCode = async () => {
    if (roomData) {
      createCodeOnline()
    } else {
      createCodeOffline()
    }
  };

  const createCodeOffline = async () => {
    if (difficulty === 'easy') {
      try {
        const response = await randomNumberEasy();
        await setCode(response);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    } else if (difficulty === 'medium') {
      try {
        const response = await randomNumberMed();
        await setCode(response);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await randomNumberMed();
        await setCode(response);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const createCodeOnline = async () => {
    const codeData = {
      room: roomData.room,
      code: code
    }
    if (difficulty === 'easy') {
      try {
        const response = await randomNumberEasy();
        await setCode(response);
        codeData.code = response;
        setHasLoaded(true);
        socket.emit('send_code', codeData);
        console.log(`code sent: ${codeData.code}`);
      } catch (err) {
        console.log(err);
      }

    } else if (difficulty === 'medium') {
      try {
        const response = await randomNumberMed();
        await setCode(response);
        codeData.code = code;
        setHasLoaded(true);
        socket.emit('send_code', codeData);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await randomNumberHard();
        await setCode(response);
        codeData.code = code;
        setHasLoaded(true);
        socket.emit('send_code', codeData);
      } catch (err) {
        console.log(err);
      }
    }
  }

  socket.on('receive_code', (codeData) => {
    console.log(`code received: ${codeData}`);
    setCode(codeData);
  })

  const createBoard = () => {
    let boardArray = [];
    for(let i = 0; i < 10; i++) {
      boardArray.push(
        <Guess
          index={i}
          roomData={roomData}
          setAttempts={setAttempts}
          score={score}
          setScore={setScore}
          attempts={attempts}
          code={code}
          setDisplay={setDisplay}
          hasWon={hasWon}
          setHasWon={setHasWon}
          hasLost={hasLost}
          setHasLost={setHasLost}
          key={i}
        />
      )
    }
    return boardArray;
  };

  useEffect(() => {
    handleCode();
  },[])

  useEffect(() => {

    let interval = null;
    if (!stopTime) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10)
      }, 10)
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval)
  }, [stopTime]);

  if (hasWon) {
    return (
      <Win setStopTime={setStopTime} code={code} difficulty={difficulty} score={score} time={time} attempts={attempts} user={user} setDisplay={setDisplay} />
    )
  } else if (hasLost) {
    return (
      <Lose setStopTime={setStopTime} code={code} difficulty={difficulty} score={score} time={time} attempts={attempts} user={user} setDisplay={setDisplay}/>
    )
  } else {
    return (
      <div>
        {hasLoaded
          ? <div>
              <div className="board-stats">
                <div className="time">
                  <div className="hours">{('0' + Math.floor((time / 3600000) % 100)).slice(-2)}:</div>
                  <div className="minutes">{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</div>
                  <div className="seconds">{('0' + Math.floor((time / 1000) % 60)).slice(-2)}</div>
                </div>
                <div className="attempts">{`attempts: ${attempts}`}
                </div>
                <div className="score">
                  score: {score}
                </div>
              </div>
              <div className="board-container">
                {createBoard()}
              </div>
              <button onClick={() => setDisplay('MainMenu')} className="return-to-main-menu">Return to Main Menu</button>
            </div>
          : <div>LOADING... </div>
        }
      </div>
    )
      }
}

export default Board;