import { useState, useEffect } from 'react';
import ScoreBoard from './ScoreBoard.jsx';
import { readUserScores } from '../helper_functions/httpRequests.js';

const UserScores = ({ setDisplay }) => {
  const [scoreData, setScoreData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleScoreData = async () => {
    try {
      const { data } = await readUserScores();
      console.log(data);
      setScoreData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoaded(true);
    }
  }

  const handleMenuReturn = () => {
    setDisplay('MainMenu')
  }

  useEffect(() => {
    handleScoreData();
  },[]);

  return (
    isLoaded
      ? <div>
          <button onClick={handleMenuReturn}>Return to Main Menu</button>
          <ScoreBoard scoreData={scoreData}/>
        </div>
      : <div>
          <button onClick={handleMenuReturn}>Return to Main Menu</button>
          <div>Loading...</div>
        </div>
  );
}

export default UserScores;
