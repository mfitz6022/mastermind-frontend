import Board from './Board.jsx';

const OfflineBoard = ({ setDisplay, user, difficulty }) => {
  return (
    <div>
      <Board setDisplay={setDisplay} user={user} difficulty={difficulty}/>
    </div>
  )
}

export default OfflineBoard;