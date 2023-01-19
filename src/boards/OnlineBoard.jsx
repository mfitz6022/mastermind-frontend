import { useEffect } from 'react';
import Chat from './chat/Chat.jsx';
import Board from './Board.jsx';
import socket from '../helper_functions/sockets.js';

const OnlineBoard = ({ difficulty, setDifficulty, setDisplay, isConnected, user, currentRoom }) => {
  const roomData = {
    username: user,
    room: currentRoom
  }

  return (
    <div className="online-board">
      <div className="board">
        <Board difficulty={difficulty} setDifficulty={setDifficulty} setDisplay={setDisplay} isOnline={isConnected} roomData={roomData} user={user}/>
      </div>
      <Chat user={user} room={currentRoom}/>
    </div>
  )
}

export default OnlineBoard;