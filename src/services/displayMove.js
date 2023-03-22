export const displayMove = (
  board,
  piece,
  newRowIndex,
  newColIndex,
  currentIndex
) => {
  const newBoard = [...board];
  newBoard[currentIndex[0]] = [...board[currentIndex[0]]];
  newBoard[currentIndex[0]][currentIndex[1]] = "";
  newBoard[newRowIndex] = [...board[newRowIndex]];
  newBoard[newRowIndex][newColIndex] = piece;

  return newBoard;
};
