import { useState } from 'react';
import { AccessPrivateRoom } from '../helper_functions/sockets.js';

const JoinPrivateRoom = ({ user, roomName, setInGame, setCurrentRoom }) => {
  const [roomPassword, setRoomPassword] = useState('');

  const handleChange = (event) => {
    event.preventDefault();
    setRoomPassword(event.target.value);
  }

  const handleSubmit = async (user, roomName, roomPassword) => {
    const response = await AccessPrivateRoom(user, roomName, roomPassword);
    console.log(response);
    if (response) {
      setCurrentRoom(roomName);
      setInGame(true);
    } else {
      alert('invalid room credentials');
    }
  }

  return (
    <div className="access-private-room">
      <div>Enter the private room key</div>
      <input className="private-room-key" onChange={handleChange}/>
      <button className="join-private-room" onClick={() => handleSubmit(user, roomName, roomPassword)}>Join!</button>
    </div>
  )
}
export default JoinPrivateRoom;