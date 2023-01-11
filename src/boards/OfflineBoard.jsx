import Board from './Board.jsx';

const OfflineBoard = ({ setDisplay }) => {
  return (
    <div>
      <Board setDisplay={setDisplay}/>
    </div>
  )
}

export default OfflineBoard;