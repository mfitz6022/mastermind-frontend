import Board from './Board.jsx';

const OfflineBoard = ({ setDisplay, user }) => {
  return (
    <div>
      <Board setDisplay={setDisplay} user={user}/>
    </div>
  )
}

export default OfflineBoard;