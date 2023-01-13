import { useState, useEffect } from 'react';
import CreatePrivateRoomModal from './CreatePrivateRoomModal.jsx';
import JoinPrivateRoom from './JoinPrivateRoom.jsx';
import OnlineBoard from '../boards/OnlineBoard.jsx';
import socket from '../helper_functions/sockets.js';
import { fetchPublicRooms, fetchPrivateRooms } from '../helper_functions/sockets.js';

const OnlineMenu = ({ setDisplay, user }) => {
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
        ? <OnlineBoard currentRoom={currentRoom} user={user}/>
        : <div className="online-menu-container">
            {isConnected
            ? <div className="rooms-options-container">
                <div className="public-room-container">
                  {publicHasLoaded && privateHasLoaded
                    ? <div>
                        <div>Public Rooms:</div>
                        {rooms.map((item, index) =>
                          <div className="room-details" key={index} >
                            <button className="join-room-button" onClick={() => handleJoinRoom(item)}>Click Here to Join a Room</button>
                            <div className="room-list">
                              {usersInRoom.map((item, index) =>
                              <div className="room">
                                Players in room: {usersInRoom.toString()}
                              </div>)}
                            </div>
                          </div>
                        )}
                        <div>Private Rooms:</div>
                        {privateRooms.map((item, index) =>
                          <div className="room-details" key={index}>
                            <button className="join-room-button" onClick={() => setToggleJoin(!toggleJoin)}>Click Here to Join a Room</button>
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
                <button className="main-menu-button" onClick={() => setDisplay('MainMenu')}>Return to Main Menu</button>
              </div>
            : <div>AWAITING CONNECTION...
                <button onClick={() => setDisplay('MainMenu')}>Return to Main Menu</button>
              </div>
          }
          <div className="create-private-room">
            <div>Click Here to Create Your Own Private Room:</div>
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