import Chat from './chat/Chat.jsx';
import Board from './Board.jsx';

const OnlineBoard = ({ difficulty, setDifficulty, setDisplay, isConnected, user }) => {
  return (
    <div className="online-board">
      <Board difficulty={difficulty} setDifficulty={setDifficulty} setDisplay={setDisplay} isOnline={isConnected}/>
      <Chat user={user}/>
    </div>
  )
}

export default OnlineBoard;