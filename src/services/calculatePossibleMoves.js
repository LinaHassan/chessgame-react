export const calculatePossibleMoves = (
  pieceType,
  rowIndex,
  colIndex,
  board,
  turn
) => {
  const possibleMoves = [];
  switch (pieceType) {
    case "WP":
      if (turn === "Black") break;
      if (rowIndex === 6) {
        if (board[rowIndex - 1][colIndex] === "") {
          possibleMoves.push([rowIndex - 1, colIndex]);

          if (board[rowIndex - 2][colIndex] === "")
            possibleMoves.push([rowIndex - 2, colIndex]);
        }
        if (
          board[rowIndex - 1][colIndex + 1]?.charAt(0) === "B" &&
          board[rowIndex - 1][colIndex + 1]
        )
          possibleMoves.push([rowIndex - 1, colIndex + 1]);
        if (
          board[rowIndex - 1][colIndex - 1]?.charAt(0) === "B" &&
          board[rowIndex - 1][colIndex - 1]
        ) {
          possibleMoves.push([rowIndex - 1, colIndex - 1]);
        }
      } else {
        if (board[rowIndex - 1][colIndex] === "")
          possibleMoves.push([rowIndex - 1, colIndex]);
        if (
          board[rowIndex - 1][colIndex + 1]?.charAt(0) === "B" &&
          board[rowIndex - 1][colIndex + 1]
        )
          possibleMoves.push([rowIndex - 1, colIndex + 1]);
        if (
          board[rowIndex - 1][colIndex - 1]?.charAt(0) === "B" &&
          board[rowIndex - 1][colIndex - 1]
        ) {
          possibleMoves.push([rowIndex - 1, colIndex - 1]);
        }
      }

      break;
    case "BP":
      if (turn === "White") break;
      if (rowIndex === 1) {
        if (board[rowIndex + 1][colIndex] === "")
          possibleMoves.push([rowIndex + 1, colIndex]);

        if (
          board[rowIndex + 2][colIndex] === "" &&
          board[rowIndex + 1][colIndex] === ""
        )
          possibleMoves.push([rowIndex + 2, colIndex]);
        if (
          board[rowIndex + 1][colIndex + 1]?.charAt(0) === "W" &&
          board[rowIndex + 1][colIndex + 1]
        )
          possibleMoves.push([rowIndex + 1, colIndex + 1]);
        if (
          board[rowIndex + 1][colIndex - 1]?.charAt(0) === "W" &&
          board[rowIndex + 1][colIndex - 1]
        )
          possibleMoves.push([rowIndex - 1, colIndex - 1]);
      } else {
        if (board[rowIndex + 1][colIndex] === "")
          possibleMoves.push([rowIndex + 1, colIndex]);
        if (
          board[rowIndex + 1][colIndex + 1]?.charAt(0) === "W" &&
          board[rowIndex + 1][colIndex + 1]
        )
          possibleMoves.push([rowIndex + 1, colIndex + 1]);
        if (
          board[rowIndex + 1][colIndex - 1]?.charAt(0) === "W" &&
          board[rowIndex + 1][colIndex - 1]
        )
          possibleMoves.push([rowIndex + 1, colIndex - 1]);
      }

      break;

    case "BB":
      if (turn === "White") break;
      {
        forwardRight(board, possibleMoves, rowIndex, colIndex, "BB");
        backwardRight(board, possibleMoves, rowIndex, colIndex, "BB");
        forwardLeft(board, possibleMoves, rowIndex, colIndex, "BB");
        backwardLeft(board, possibleMoves, rowIndex, colIndex, "BB");
      }
      break;

    case "WB":
      if (turn === "White") {
        forwardRight(board, possibleMoves, rowIndex, colIndex, "WB");
        backwardRight(board, possibleMoves, rowIndex, colIndex, "WB");
        forwardLeft(board, possibleMoves, rowIndex, colIndex, "WB");
        backwardLeft(board, possibleMoves, rowIndex, colIndex, "WB");
      }
      break;
    default:
      break;
  }
  return possibleMoves;
};
const forwardRight = (board, possibleMoves, rowIndex, colIndex, pieceType) => {
  for (let i = 1; i < 8; i++) {
    if (
      colIndex + i < 0 ||
      rowIndex + i < 0 ||
      rowIndex + i > 7 ||
      colIndex + i > 7
    )
      break;
    if (board[rowIndex + i][colIndex + i] === "") {
      possibleMoves.push([rowIndex + i, colIndex + i]);
    } else if (board[rowIndex + i][colIndex + i]?.charAt(0) !== pieceType[0]) {
      {
        possibleMoves.push([rowIndex + i, colIndex + i]);
        break;
      }
    } else {
      break;
    }
  }
};

const forwardLeft = (board, possibleMoves, rowIndex, colIndex, pieceType) => {
  for (let j = 8; j >= 0; j--) {
    rowIndex++;
    colIndex--;
    if (colIndex < 0 || rowIndex < 0 || rowIndex > 7 || colIndex > 7) break;

    if (board[rowIndex][colIndex] === "") {
      possibleMoves.push([rowIndex, colIndex]);
    } else if (board[rowIndex][colIndex]?.charAt(0) !== pieceType[0]) {
      {
        possibleMoves.push([rowIndex, colIndex]);
        break;
      }
    } else {
      break;
    }
  }
};

const backwardRight = (board, possibleMoves, rowIndex, colIndex, pieceType) => {
  for (let i = 1; i < 8; i++) {
    if (
      colIndex + i < 0 ||
      rowIndex - i < 0 ||
      rowIndex - i > 7 ||
      colIndex + i > 7
    )
      break;
    if (board[rowIndex - i][colIndex + i] === "") {
      possibleMoves.push([rowIndex - i, colIndex + i]);
    } else if (board[rowIndex - i][colIndex + i]?.charAt(0) !== pieceType[0]) {
      {
        possibleMoves.push([rowIndex - i, colIndex + i]);
        break;
      }
    } else {
      break;
    }
  }
};

const backwardLeft = (board, possibleMoves, rowIndex, colIndex, pieceType) => {
  for (let j = 8; j >= 0; j--) {
    rowIndex--;
    colIndex--;
    if (colIndex < 0 || rowIndex < 0 || rowIndex > 7 || colIndex > 7) break;

    if (board[rowIndex][colIndex] === "") {
      possibleMoves.push([rowIndex, colIndex]);
    } else if (board[rowIndex][colIndex]?.charAt(0) !== pieceType[0]) {
      {
        possibleMoves.push([rowIndex, colIndex]);
        break;
      }
    } else {
      break;
    }
  }
};
