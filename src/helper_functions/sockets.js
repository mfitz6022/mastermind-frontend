import { io } from 'socket.io-client';
import axios from 'axios';
import { joinRoomSchema, createRoomSchema } from '../schemas.js';

const URL = 'http://54.67.49.166:3000';

const socket = io(URL, { autoConnect: false });

export const fetchPublicRooms = async (setRoomList, setPublicHasLoaded) => {
  try {
    const { data } = await axios.get(`${URL}/global/rooms/public`);
    await setRoomList(data);
    setPublicHasLoaded(true);
  } catch (err) {
    console.log(err);
  }
}

export const fetchPrivateRooms = async (setPrivateRoomList, setPrivateHasLoaded) => {
  try {
    const { data } = await axios.get(`${URL}/global/rooms/private`);
    await setPrivateRoomList(data);
    setPrivateHasLoaded(true);
  } catch (err) {
    console.log(err);
  }
}

export const createPrivateRoom = async (roomOwner, roomName, roomPassword) => {
  const roomData = {
    roomOwner: roomOwner,
    roomName: roomName,
    roomPassword: roomPassword
  }
  try {
    const isValid = await createRoomSchema.isValid(roomData);
    if (isValid) {
      const response = await axios.post(`${URL}/global/rooms/private/create`, roomData)
      console.log(response);
    } else {
      return isValid;
    }
  } catch (err) {
    console.log(err);
  }
}

export const AccessPrivateRoom = async (user, roomName, roomPassword) => {
  const roomData = {
    userName: user,
    roomName: roomName,
    roomPassword: roomPassword
  }
  try {
    const isValid = await joinRoomSchema.isValid(roomData);
    if (isValid) {
      const { data } = await axios.post(`${URL}/global/rooms/private/join`, roomData)
      return data;
    } else {
      return isValid
    }
  } catch (err) {
    console.log(err)
  }
}

export default socket
