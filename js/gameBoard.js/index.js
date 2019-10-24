export const gameBoard = (() => {
    let board = ['1', '4', '7', '2', '5', '8', '3', '6', '9'];
  
    const addPosition = (position, mark) => {
      board[position - 1] = mark;
    };
  
    const resetBoard = () => {
      board = ['1', '4', '7', '2', '5', '8', '3', '6', '9'];
      return board;
    };
    return {
      board,
      addPosition,
      resetBoard,
    };
  })();