const Message = ({ messageData }) => {
  return (
    <div className="message-box">
      <div className="message-user">{messageData.user}</div>
      <div className="message-body">{messageData.message}</div>
    </div>
  )
}

export default Message;