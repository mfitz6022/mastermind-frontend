import { useState, useEffect } from 'react';
import { randomNumberEasy, randomNumberMed, randomNumberHard } from '../helper_functions/httpRequests.js';
import Guess from './gameplay/Guess.jsx';
import Win from './gameplay/results/Win.jsx';
import Lose from './gameplay/results/Lose.jsx';

const Board = ({ difficulty, setDifficulty, setDisplay, isConnected }) => {
  const [attempts, setAttempts] = useState(1);
  const [code, setCode] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const hardCodeDifficulty = 'easy';

  const handleCode = async (difficulty) => {
    if (hardCodeDifficulty === 'easy') {
      const response = await randomNumberEasy()
      setCode(response);
      setHasLoaded(true);
    } else if (difficulty === 'medium') {
      const response = await randomNumberMed()
      setCode(response);
      setHasLoaded(true);
    } else {
      const response = await randomNumberHard()
      setCode(response);
      setHasLoaded(true);
    }
  }

  const createBoard = () => {
    let boardArray = [];
    for(let i = 0; i < 10; i++) {
      boardArray.push(
        <Guess
          setAttempts={setAttempts}
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
  }
  useEffect(() => {
    handleCode();
  }, [difficulty]);

  if (hasWon) {
    return (
      <Win code={code} setDisplay={setDisplay}/>
    )
  } else if (hasLost) {
    return (
      <Lose code={code} setDisplay={setDisplay}/>
    )
  } else {
    return (
      <div>
        {hasLoaded
          ? <div>
              <div className="attempts">{`attempt: ${attempts}`}</div>
              {createBoard()}
              <button onClick={() => setDisplay('MainMenu')} className="main-menu">Return to Main Menu</button>
            </div>
          : <div>LOADING... </div>
        }
      </div>
    )
      }
}

export default Board;