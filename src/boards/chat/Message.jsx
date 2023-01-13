const Message = ({ message }) => {

  return (
    <div className="message-box">
      <div className="message-user">{message.user}:</div>
      <div className="message-body">{message.message}</div>
    </div>
  )
}

export default Message;