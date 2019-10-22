const gameBoard = (() => {
  let board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const addPosition = (position, mark) => {
    board[position-1] = mark;
  };
  return {
    board,
    addPosition
  }
})();

const player = (name, mark) => {
  return {name, mark};
};

const displayController = () => {
  let players;
  const start_game = (player1, player2) => {
    players = [player1, player2];
  };

  const switch_players = () => {
    [players[0], players[1]] = [players[1], players[0]];
  }
}

const render = () => {

    document.querySelectorAll('.boardbox').forEach(function (box, index){
        console.log(box);
        box.textContent = gameBoard.board[index]
    })

};
