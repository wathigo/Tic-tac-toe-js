export const gameBoard = (() => {
  let board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const addPosition = (position, mark) => {
    board[position-1] = mark;
  }
})();
