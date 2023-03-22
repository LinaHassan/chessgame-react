export const CalculatePossibleMoves = (
  pieceType,
  board,
  turn,
  rowIndex,
  colIndex
) => {
  const possibleMoves = [];

  switch (pieceType) {
    case "WP":
      if (turn === "Black") break;

      pownForward(board, possibleMoves, rowIndex, colIndex, pieceType);
      pownRight(board, possibleMoves, rowIndex, colIndex, pieceType);
      pownLeft(board, possibleMoves, rowIndex, colIndex, pieceType);

      break;
    case "BP":
      if (turn === "White") break;
      pownForward(board, possibleMoves, rowIndex, colIndex, pieceType);
      pownRight(board, possibleMoves, rowIndex, colIndex, pieceType);
      pownLeft(board, possibleMoves, rowIndex, colIndex, pieceType);

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
const pownForward = (board, possibleMoves, rowIndex, colIndex, pieceType) => {
  pieceType[0] === "B" ? rowIndex++ : rowIndex--;

  if (
    rowIndex + 1 === 6 &&
    board[rowIndex][colIndex] === "" &&
    pieceType[0] === "W"
  ) {
    if (board[rowIndex - 1][colIndex] === "")
      possibleMoves.push([rowIndex - 1, colIndex]);
  }

  if (board[rowIndex][colIndex] === "")
    possibleMoves.push([rowIndex, colIndex]);

  if (
    rowIndex - 1 === 1 &&
    board[rowIndex][colIndex] === "" &&
    pieceType[0] === "B"
  ) {
    if (board[rowIndex + 1][colIndex] === "")
      possibleMoves.push([rowIndex + 1, colIndex]);
  }
};

const pownRight = (board, possibleMoves, rowIndex, colIndex, pieceType) => {
  pieceType[0] === "B" ? rowIndex++ : rowIndex--;
  if (
    board[rowIndex][colIndex + 1]?.charAt(0) !== pieceType[0] &&
    board[rowIndex][colIndex + 1]
  )
    possibleMoves.push([rowIndex, colIndex + 1]);
};
const pownLeft = (board, possibleMoves, rowIndex, colIndex, pieceType) => {
  pieceType[0] === "B" ? rowIndex++ : rowIndex--;
  if (
    board[rowIndex][colIndex - 1]?.charAt(0) !== pieceType[0] &&
    board[rowIndex][colIndex - 1]
  )
    possibleMoves.push([rowIndex, colIndex - 1]);
};
