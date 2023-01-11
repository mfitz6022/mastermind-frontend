import { useState, useEffect } from 'react';
import { randomNumberEasy, randomNumberMed, randomNumberHard } from '../helper_functions/httpRequests.js';
import Guess from './gameplay/Guess.jsx';

const Board = ({ difficulty }) => {
  const [attempts, setAttempts] = useState(0);
  const [code, setCode] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
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

  useEffect(() => {
    handleCode();
  }, [difficulty]);


  return (
    <div>
      {hasLoaded
        ? <Guess attempts={attempts} setAttempts={setAttempts} code={code}/>
        : <div>LOADING... </div>
      }
    </div>
  )
}

export default Board;