export const displayHistory = (
  board,
  peice,
  newRowIndex,
  newcolIndex,
  currentIndex,
  gameOver
) => {
  const history = [];
  const horizontal = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const currentMove = `${peice[1]}${horizontal[currentIndex[1]]}${
    currentIndex[0]
  } `;
  const nextMove = `${horizontal[newcolIndex]}${newRowIndex}`;
  if (gameOver === true) {
    history.push(
      `${currentMove} # ${board[newRowIndex][newcolIndex][1]}${nextMove}`
    );
  } else if (board[newRowIndex][newcolIndex] === "") {
    history.push(`${currentMove} --> ${peice[1]}${nextMove}`);
  } else {
    history.push(
      `${currentMove} X  ${board[newRowIndex][newcolIndex][1]}${nextMove}`
    );
  }

  return history;
};
