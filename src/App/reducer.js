import { displayHistory } from "../services/displayHistory";
import { displayMove } from "../services/displayMove";
import { initialState } from "./initialState";

export const SELECTED_PIECE = "SELECTED_PIECE";
export const CALCULATE_MOVES = "CALCULATE_MOVES";
export const MAKE_MOVE = "MAKE_MOVE";
export const GAME_OVER = "GAME_OVER";

export const selectedPiece = (pieceType) => ({
  type: SELECTED_PIECE,
  payload: pieceType,
});
export function calculateMoves(possibleMoves, rowIndex, colIndex) {
  return {
    type: CALCULATE_MOVES,
    payload: { possibleMoves, rowIndex, colIndex },
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
      const newBoard = displayMove(
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
      const { possibleMoves, rowIndex, colIndex } = action.payload;
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
