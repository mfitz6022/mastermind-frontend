import { useState, useEffect } from 'react';
import ScoreBoard from './ScoreBoard.jsx';
import { readUserScores } from '../helper_functions/httpRequests.js';

const UserScores = ({ user, setDisplay }) => {
  const [scoreData, setScoreData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const isGlobal = false;

  const handleScoreData = async () => {
    try {
      const result = await readUserScores(user);
      setScoreData(result);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoaded(true);
    }
  }

  useEffect(() => {
    handleScoreData();
  },[]);

  return (
    isLoaded
      ? <div>
          <ScoreBoard scoreData={scoreData} isGlobal={isGlobal} setDisplay={setDisplay}/>
        </div>
      : <div>
          <button className="return-to-main-menu" onClick={() => {setDisplay('MainMenu')}}>Return to Main Menu</button>
          <div>Loading...</div>
        </div>
  );
}

export default UserScores;
