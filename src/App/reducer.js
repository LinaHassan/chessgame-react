import { calculatePossibleMoves } from "../services/calculatePossibleMoves";
import { displayHistory } from "../services/displayHistory";
import { calculateMove } from "../services/calculateMove";
const initialBoardState = [
  ["BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR"],
  ["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"],
  ["WR", "WN", "WB", "WQ", "WK", "WB", "WN", "WR"],
];

const initialState = {
  board: initialBoardState,
  turn: "White",
  selectedPiece: null,
  currentIndex: [],
  gameOver: false,
  allPossibleMoves: [],
  boardHistory: [],
};

export const SELECTED_PIECE = "SELECTED_PIECE";
export const CALCULATE_MOVES = "CALCULATE_MOVES";
export const MAKE_MOVE = "MAKE_MOVE";
export const GAME_OVER = "GAME_OVER";

export const selectedPiece = (pieceType) => ({
  type: "SELECTED_PIECE",
  payload: pieceType,
});
export function calculateMoves(pieceType, rowIndex, colIndex) {
  return {
    type: CALCULATE_MOVES,
    payload: { pieceType, rowIndex, colIndex },
  };
}
export function makeMove(newRowIndex, newcolIndex) {
  return {
    type: "MAKE_MOVE",
    payload: { newRowIndex, newcolIndex },
  };
}
export function gameOver() {
  return {
    type: "GAME_OVER",
  };
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_MOVE:
      const { newRowIndex, newcolIndex } = action.payload;
      const history = displayHistory(
        state.board,
        state.selectedPiece,
        newRowIndex,
        newcolIndex,
        state.currentIndex,
        state.gameOver
      );
      const newBoard = calculateMove(
        state.board,
        state.selectedPiece,
        newRowIndex,
        newcolIndex,
        state.currentIndex
      );

      return {
        ...state,
        allPossibleMoves: [],
        board: newBoard,
        turn: `${state.selectedPiece[0] === "B" ? "White" : "Black"}`,
        boardHistory: history,
      };
    case SELECTED_PIECE:
      return { ...state, selectedPiece: action.payload };
    case CALCULATE_MOVES:
      const { pieceType, rowIndex, colIndex } = action.payload;
      const possibleMoves = calculatePossibleMoves(
        pieceType,
        rowIndex,
        colIndex,
        state.board,
        state.turn
      );

      return {
        ...state,
        currentIndex: [rowIndex, colIndex],
        allPossibleMoves: possibleMoves,
      };
    case GAME_OVER:
      let checkmate;
      state.allPossibleMoves.forEach((element) => {
        if (state.board[element[0]][element[1]][1] === "K") {
          checkmate = true;
        } else {
          checkmate = false;
        }
      });
      return {
        ...state,
        gameOver: checkmate,
      };
    default:
      return state;
  }
};
