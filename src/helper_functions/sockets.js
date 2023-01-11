import { io } from 'socket.io-client';
// import axios from 'axios';

const URL = 'http://localhost:3000';

const socket = io(URL, { autoConnect: false });

// export const fetchRooms = async (setRoomList) => {
//   try {
//     const { data } = await axios.get(`${URL}/global/rooms`);
//     setRoomList(data);
//   } catch (err) {
//     console.log(err);
//   }
// }

export default socket
