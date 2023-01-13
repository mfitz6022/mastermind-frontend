import { useState, useEffect } from 'react';
import ScoreBoard from './ScoreBoard.jsx';
// import { readGlobalLeaderboards } from '../helper_functions/httpRequests.js';

const GlobalScores = ({ setDisplay }) => {
  const [scoreData, setScoreData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // const handleScoreData = async () => {
  //   try {
  //     const { data } = await readGlobalLeaderboards();
  //     console.log(data);
  //     setScoreData(data);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setIsLoaded(true);
  //   }
  // }

  // useEffect(() => {
  //   handleScoreData();
  // },[]);

  return (
    isLoaded
      ? <div>
          <ScoreBoard scoreData={scoreData} setDisplay={setDisplay}/>
        </div>
      : <div>
          <button onClick={() => {setDisplay('MainMenu')}}>Return to Main Menu</button>
          <div>Loading...</div>
        </div>
  );
}

export default GlobalScores;