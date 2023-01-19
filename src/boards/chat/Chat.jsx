import { useState } from 'react';
import socket from '../../helper_functions/sockets.js';
import Message from './Message.jsx';
import{ messageSchema } from '../../schemas.js';

const Chat = ({ user, room }) => {
  // const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [messageData, setMessageData] = useState({user: user, room: room, message: ' '});
  const [messageValid, setMessageValid] = useState(true);

  const handleTyping = (event) => {
    event.preventDefault();
    setMessageData({
      user: user,
      room: room,
      message: event.target.value
    })
  }

  socket.on('receive_message', (data) => {
    setMessageList([...messageList, data])
  })

  const handleSend = async (messageData) => {
    const isValid = await messageSchema.isValid(messageData);
    if (isValid) {
      setMessageValid(true)
      socket.emit('send_message', messageData);
      setMessageList([...messageList, messageData]);
    } else {
      setMessageValid(false);
    }
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
      <div className="message-validation">
        {messageValid
          ? null
          : <div>invalid message user, room, or length</div>
        }
      </div>
    </div>
  )
}

export default Chat;