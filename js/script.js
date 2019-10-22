const gameBoard = (() => {
  let board = ["","","","","","","","",""];

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

const displayController = (() => {
  var players = [];
  const start_game = (player1, player2) => {
    var players = [player1, player2];
  };

  const switch_players = () => {
    [players[0], players[1]] = [players[1], players[0]];
  }

  return{start_game, switch_players, players};
})();

const updateBox = (box) => {
  console.log('click')
  gameBoard.addPosition(box.textContent, displayController.players[0].mark)
  console.log(gameBoard.board)
  box.textContent = 'X'
  displayController.switch_players();
}

const createPlayers = () =>{
    const playerO =  player(document.querySelector('.playerO').value, "O")
    const playerX =  player(document.querySelector('.playerX').value, "X")
    displayController.start_game(playerO, playerX)

}

const render = () => {

    createPlayers();
    document.querySelectorAll('.boardbox').forEach(function (box, index){
        console.log(box);
        box.textContent = gameBoard.board[index]
        box.addEventListener('click', (evt) => {
          updateBox(event.target);
        })
    })

};
