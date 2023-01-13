import { useEffect } from 'react';
import Chat from './chat/Chat.jsx';
import Board from './Board.jsx';
import socket from '../helper_functions/sockets.js';

const OnlineBoard = ({ difficulty, setDifficulty, setDisplay, isConnected, user, currentRoom }) => {
  const roomData = {
    username: user,
    room: currentRoom
  }

  useEffect(() => {
    socket.emit('join', roomData)
  },[])



  return (
    <div className="online-board">
      <Board difficulty={difficulty} setDifficulty={setDifficulty} setDisplay={setDisplay} isOnline={isConnected} roomData={roomData}/>
      <Chat user={user} room={currentRoom}/>
    </div>
  )
}

export default OnlineBoard;