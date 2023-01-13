import { io } from 'socket.io-client';
import axios from 'axios';

const URL = 'http://localhost:3000';

const socket = io(URL, { autoConnect: false });

export const fetchPublicRooms = async (setRoomList, setPublicHasLoaded) => {
  try {
    const { data } = await axios.get(`${URL}/global/rooms/public`);
    console.log(`fetchPublicRooms response: ${data}`)
    await setRoomList(data);
    setPublicHasLoaded(true);
  } catch (err) {
    console.log(err);
  }
}

export const fetchPrivateRooms = async (setPrivateRoomList, setPrivateHasLoaded) => {
  try {
    const { data } = await axios.get(`${URL}/global/rooms/private`);
    console.log(`fetchPrivateRooms response: ${data}`);
    await setPrivateRoomList(data);
    setPrivateHasLoaded(true);
  } catch (err) {
    console.log(err);
  }
}

export const createPrivateRoom = async (roomOwner, roomName, roomPassword) => {
  try {
    const response = await axios.post(`${URL}/global/rooms/private/create`, {
      roomOwner: roomOwner,
      roomName: roomName,
      roomPassword: roomPassword,
    })
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

export const AccessPrivateRoom = async (user, roomName, roomPassword) => {
  try {
    const { data } = await axios.post(`${URL}/global/rooms/private/join`, {
      userName: user,
      roomName: roomName,
      roomPassword: roomPassword
    })
    return data;
  } catch (err) {
    console.log(err)
  }
}

export default socket
