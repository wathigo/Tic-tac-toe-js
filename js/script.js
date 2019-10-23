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
  let players = [];
  const start_game = (player1, player2) => {
    players[0] = player1;
    players[1] = player2;
  };

  const switch_players = (player1, player2) => {
    console.log('Switching players');
    players[0] = player2;
    players[1] = player1;
  }

  return{start_game, switch_players, players};
})();

const updateBox = (box) => {
  console.log(box.textContent.length)
  if(box.textContent.length !== 0){
    console.log("Not empty!")
    box.style.background = 'red';
    document.querySelector('.errormsg').style.visibility = 'visible';
    setTimeout(() => {
      document.querySelector('.errormsg').style.visibility = 'hidden';
      box.style.background = '#fff';
    }, 800);
  } else {
    console.log(displayController.players)
    gameBoard.addPosition(box.textContent, displayController.players[0].mark)
    console.log(gameBoard.board)
    box.textContent = displayController.players[0].mark;
    displayController.switch_players(displayController.players[0], displayController.players[1]);
    console.log(displayController.players)
  }
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
