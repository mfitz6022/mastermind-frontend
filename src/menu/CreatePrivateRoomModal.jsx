import { useState } from 'react';
import { createPrivateRoom } from '../helper_functions/sockets.js';

const CreatePrivateRoomModal = ({ user }) => {
  const [roomName, setRoomName] = useState('');
  const [roomPass, setRoomPass] = useState('');
  const [hasSent, setHasSent] = useState(false);

  const handleNameInput = (event) => {
    event.preventDefault();
    setRoomName(event.target.value);
  }

  const handlePasswordInput = (event) => {
    event.preventDefault();
    setRoomPass(event.target.value);
  }

  const handleSubmit = (user, roomName, roomPass) => {
    createPrivateRoom(user, roomName, roomPass)
    setHasSent(true);
  }

  return (
    <div className="create-room-modal">
      <div className="private-room-message">Please enter a name for your private room</div>
      <input className="private-room-name" onChange={handleNameInput}/>
      <div className="private-room-message">Please enter a password for your private room</div>
      <input className="private-room-password" type="password" onChange={handlePasswordInput}/>
      {hasSent
        ? <button className="submit-private-room">Sent!</button>
        : <button className="submit-private-room" onClick={() => handleSubmit(user, roomName, roomPass)}>Submit!</button>
      }
    </div>
  )
}

export default CreatePrivateRoomModal;