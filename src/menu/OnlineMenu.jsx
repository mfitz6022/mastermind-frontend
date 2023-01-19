import { useState, useEffect } from 'react';
import CreatePrivateRoomModal from './CreatePrivateRoomModal.jsx';
import JoinPrivateRoom from './JoinPrivateRoom.jsx';
import OnlineBoard from '../boards/OnlineBoard.jsx';
import socket from '../helper_functions/sockets.js';
import { fetchPublicRooms, fetchPrivateRooms } from '../helper_functions/sockets.js';

const OnlineMenu = ({ setDisplay, user, difficulty }) => {
  const [inGame, setInGame] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [toggleJoin, setToggleJoin] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [privateRooms, setPrivateRooms] = useState([]);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({});
  const [publicHasLoaded, setPublicHasLoaded] = useState(false);
  const [privateHasLoaded, setPrivateHasLoaded] = useState(false);
  const [createRoomModal, setCreateRoomModal] = useState(false);

  useEffect(() => {
    socket.connect();
    setIsConnected(true);

    fetchPublicRooms(setRooms, setPublicHasLoaded);

    fetchPrivateRooms(setPrivateRooms, setPrivateHasLoaded);

    socket.on('disconnect', () => {
      setIsConnected(false);
    })
  },[])

  const handleJoinRoom = (room) => {
    setCurrentRoom(room);
    setInGame(true);
  }

  return (
    <div>
      {inGame
        ? <OnlineBoard difficulty={difficulty} currentRoom={currentRoom} setDisplay={setDisplay} user={user}/>
        : <div className="online-menu-container">
            {isConnected
            ? <div className="rooms-options-container">
                <div className="public-room-container">
                  {publicHasLoaded && privateHasLoaded
                    ? <div>
                        <div className="rooms-container">Public Rooms:</div>
                        {rooms.map((item, index) =>
                          <div className="room-details" key={index} >
                            <div className="room-name">{item}</div>
                            <button className="join-room-button" onClick={() => handleJoinRoom(item)}>Join Room</button>
                            <div className="room-list">
                              {usersInRoom.map((item, index) =>
                              <div className="room">
                                Players in room: {usersInRoom.toString()}
                              </div>)}
                            </div>
                          </div>
                        )}
                        <div className="rooms-container">Private Rooms:</div>
                        {privateRooms.map((item, index) =>
                          <div className="room-details" key={index}>
                            <div className="room-name">{item.room_name}</div>
                            <div className="room-owner">Owner: {item.owner}</div>
                            <button className="join-room-button" onClick={() => setToggleJoin(!toggleJoin)}>Join Room</button>
                            {toggleJoin
                              ? <JoinPrivateRoom user={user} roomName={item.room_name} setInGame={setInGame} setCurrentRoom={setCurrentRoom}/>
                              : null
                            }
                            <div className="room-list">
                              {usersInRoom.map((item, index) =>
                              <div className="room">
                                Players in room: {usersInRoom.toString()}
                              </div>)}
                            </div>
                          </div>
                        )}
                      </div>
                    : <div>FETCHING ROOMS</div>
                  }
                </div>
                <button className="back-to-main-menu-button" onClick={() => setDisplay('MainMenu')}>Return to Main Menu</button>
              </div>
            : <div>AWAITING CONNECTION...
                <button onClick={() => setDisplay('MainMenu')}>Return to Main Menu</button>
              </div>
          }
          <div className="create-private-room">
            <div className="create-private-room-title">Click Here to Create Your Own Private Room:</div>
            <button className="create-private-room-button" onClick={() => setCreateRoomModal(!createRoomModal)}>Create Room</button>
            {createRoomModal
              ? <CreatePrivateRoomModal user={user}/>
              : null
            }
          </div>
        </div>
      }
    </div>
  )
}

export default OnlineMenu;