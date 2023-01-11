import { useState, useEffect } from 'react';
import socket from '../helper_functions/sockets.js';

const OnlineMenu = ({ setDisplay, user }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [usersInRoom, setUsersInRoom] = useState([])
  const [currentRoom, setCurrentRoom] = useState({})

  useEffect(() => {
    socket.connect();
    setIsConnected(true);

    socket.on('disconnect', () => {
      setIsConnected(false);
    })
  },[])

  const handleJoinRoom = async (user) => {
    socket.emit('join_room', user);
  }

  socket.on('joined', async (data) => {
    try {
      setRooms([...rooms, data.room])
      await setUsersInRoom(...usersInRoom, data.username)
      setCurrentRoom({
        users: usersInRoom,
        room: data.room
      })
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <div>
      {isConnected
        ? <div>
            <button className="join-room-button" onClick={() => handleJoinRoom(user)}>Click Here to Join a Room</button>
            <div className="room-list">
              {usersInRoom.map((item, index) =>
              <div className="room">
                `Players: ${usersInRoom.toString()}`
              </div>)}
            </div>
            <button className="main-menu-button" onClick={() => setDisplay('MainMenu')}>Return to Main Menu</button>
          </div>
        : <div>AWAITING CONNECTION...
            <button onClick={() => setDisplay('MainMenu')}>Return to Main Menu</button>
          </div>
      }
    </div>
  )
}

export default OnlineMenu;