import { useState } from 'react';
import socket from '../../helper_functions/sockets.js';
import Message from './Message.jsx';

const Chat = ({ user, room }) => {
  // const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [messageData, setMessageData] = useState({user: user, room: room, message: ''});

  const handleTyping = (event) => {
    event.preventDefault();
    setMessageData({
      user: user,
      room: room,
      message: event.target.value
    })
  }

  socket.on('receive_message', (data) => {
    console.log(data)
    setMessageList([...messageList, data])
  })

  const handleSend = async (messageData) => {
    if (messageData.message.length < 1) {
      alert('You must enter some text before sending a message!')
    }

    socket.emit('send_message', messageData);
    setMessageList([...messageList, messageData]);
  }

  return (
    <div className="message-container">
      <div className="message-list">
        {
          messageList.map((message, index) =>
          <Message key={index} message={message} />
          )
        }
      </div>
      <div className="message-input-container">
        <input className="message-input" onChange={handleTyping}/>
        <button className="message-send" onClick={() => handleSend(messageData)}>Send</button>
      </div>
    </div>
  )
}

export default Chat;