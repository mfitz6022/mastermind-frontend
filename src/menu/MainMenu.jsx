import { useState } from 'react';
import GlobalScores from '../leaderboards/GlobalScores.jsx';
import UserScores from '../leaderboards/UserScores.jsx';
import HowToPlay from '../Misc/HowToPlay.jsx';
import Options from '../Misc/Options.jsx';
import OfflineBoard from '../boards/OfflineBoard.jsx';
import OnlineMenu from './OnlineMenu.jsx';

const MainMenu = () => {
  const [display, setDisplay] = useState('MainMenu');

  if (display === 'MainMenu') {
    return (
      <div>
        <button onClick={() => {setDisplay('GlobalScores')}}>Leaderboards</button>
        <button onClick={() => {setDisplay('UserScores')}}>Previous Scores</button>
        <button onClick={() => {setDisplay('HowToPlay')}}>How to Play</button>
        <button onClick={() => {setDisplay('Options')}}>Options</button>
        <button onClick={() => {setDisplay('OfflinePlay')}}>Play!</button>
        <button onClick={() => {setDisplay('OnlineMenu')}}>Online Mode</button>
      </div>
    )
  } else if (display === 'GlobalScores') {
    return <GlobalScores setDisplay={setDisplay}/>
  } else if (display === 'UserScores') {
    return <UserScores setDisplay={setDisplay}/>
  } else if (display === 'HowToPlay') {
    return <HowToPlay setDisplay={setDisplay}/>
  } else if (display === 'Options') {
    return <Options setDisplay={setDisplay}/>
  } else if (display === 'OfflinePlay') {
    return <OfflineBoard setDisplay={setDisplay}/>
  } else {
    return <OnlineMenu setDisplay={setDisplay}/>
  }
}

export default MainMenu;