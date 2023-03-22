import "./Board.css";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import { makeMove } from "../../../App/reducer";
import { gameOver } from "../../../App/reducer";
import { selectedPiece } from "../../../App/reducer";
import { CalculatePossibleMoves } from "../../../services/calculatePossibleMoves";
import { calculateMoves } from "../../../App/reducer";

const Board = () => {
  const checkMate = useSelector((state) => state.gameOver);
  const { board, turn, allPossibleMoves } = useSelector((state) => state);

  const dispatch = useDispatch();

  const selected = (piece, rowIndex, colIndex) => {
    dispatch(selectedPiece(piece));
    const possibleMoves = CalculatePossibleMoves(
      piece,
      board,
      turn,
      rowIndex,
      colIndex
    );
    if (possibleMoves)
      dispatch(calculateMoves(possibleMoves, rowIndex, colIndex));

    dispatch(gameOver());
  };

  const makeAMove = (rowIndex, colIndex) => {
    const cell = [rowIndex, colIndex];

    if (
      allPossibleMoves?.some(
        (move) => JSON.stringify(move) === JSON.stringify(cell)
      )
    )
      dispatch(makeMove(rowIndex, colIndex));
  };

  const boardState = board.map((row, rowIndex) => (
    <div className="board-row" key={rowIndex}>
      {row.map((piece, colIndex) => {
        const cell = [rowIndex, colIndex];
        const squareClasses = `board-square ${
          (rowIndex + colIndex) % 2 === 0 ? "even-card" : "odd-card"
        } ${
          allPossibleMoves?.some(
            (move) => JSON.stringify(move) === JSON.stringify(cell)
          )
            ? "highlighted"
            : ""
        }`;

        return (
          <div
            className={squareClasses}
            onClick={() => {
              makeAMove(rowIndex, colIndex);
            }}
            key={nanoid()}
          >
            {piece && (
              <img
                onClick={() => {
                  if (
                    allPossibleMoves?.some(
                      (move) => JSON.stringify(move) === JSON.stringify(cell)
                    )
                  ) {
                    makeAMove(rowIndex, colIndex);
                  } else {
                    selected(piece, rowIndex, colIndex);
                  }
                }}
                alt="Piece"
                src={require(`../../../assets/img/${piece}.png`)}
              />
            )}
          </div>
        );
      })}
    </div>
  ));

  return (
    <div className="board">
      {boardState}
      <p className="board_turn">Turn : {turn}</p>
      {checkMate && <p className="board_gameOver">checkMate</p>}
    </div>
  );
};
export default Board;
