import { useState } from 'react';
import GlobalScores from '../leaderboards/GlobalScores.jsx';
import UserScores from '../leaderboards/UserScores.jsx';
import HowToPlay from '../Misc/HowToPlay.jsx';
import Options from '../Misc/Options.jsx';
import OfflineBoard from '../boards/OfflineBoard.jsx';
import OnlineMenu from './OnlineMenu.jsx';

const MainMenu = ({ user }) => {
  const [display, setDisplay] = useState('MainMenu');
  const [difficulty, setDifficulty] = useState('easy');

  if (display === 'MainMenu') {
    return (
      <div className="main-menu-nav">
        <button className="main-menu-button" onClick={() => {setDisplay('GlobalScores')}}>Leaderboards</button>
        <button className="main-menu-button" onClick={() => {setDisplay('UserScores')}}>Previous Scores</button>
        <button className="main-menu-button" onClick={() => {setDisplay('HowToPlay')}}>How to Play</button>
        <button className="main-menu-button" onClick={() => {setDisplay('Options')}}>Options</button>
        <button className="main-menu-button" onClick={() => {setDisplay('OfflinePlay')}}>Play!</button>
        <button className="main-menu-button" onClick={() => {setDisplay('OnlineMenu')}}>Online Mode</button>
      </div>
    )
  } else if (display === 'GlobalScores') {
    return <GlobalScores setDisplay={setDisplay}/>
  } else if (display === 'UserScores') {
    return <UserScores user={user} setDisplay={setDisplay}/>
  } else if (display === 'HowToPlay') {
    return <HowToPlay setDisplay={setDisplay}/>
  } else if (display === 'Options') {
    return <Options setDisplay={setDisplay} difficulty={difficulty} setDifficulty={setDifficulty}/>
  } else if (display === 'OfflinePlay') {
    return <OfflineBoard setDisplay={setDisplay} setDifficulty={setDifficulty}  difficulty={difficulty} user={user}/>
  } else {
    return <OnlineMenu setDisplay={setDisplay} user={user} />
  }
}

export default MainMenu;