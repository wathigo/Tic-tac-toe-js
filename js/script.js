const gameBoard = (() => {
  let board = ["1", "4", "7", "2", "5", "8", "3", "6", "9"];

  const addPosition = (position, mark) => {
    board[position - 1] = mark;
  };
  return {
    board,
    addPosition
  }
})();

const player = (name, mark) => {
  return { name, mark };
};

const displayController = (() => {

  let players = [];
  let gamestop = ""; 

  const start_game = (player1, player2) => {
    players[0] = player1;
    players[1] = player2;
    gamestop = false;
  };

  const switch_players = (player1, player2) => {
    console.log('Switching players');
    players[0] = player2;
    players[1] = player1;
  }

  const check_winner = (board, player) => {
    check_horizontal(board, player)
    check_vertical(board, player)
    check_diagonal(board, player)
    check_draw(board)
  }

  const check_horizontal = (board, player) => {
    for (let i = 0; i < 3; i++) {
      if (board[0 + i * 3] == board[1 + i * 3] && board[1 + i * 3] == board[2 + i * 3]) {
        winner(player)
      }
    }
  }

  const check_vertical = (board, player) => {
    for (let i = 0; i < 3; i++) {
      if (board[0 + i] == board[3 + i] && board[3 + i] == board[6 + i]) {
        winner(player)
      }
    }
  }

  const check_diagonal = (board, player) => {
    if (board[0] == board[4] && board[4] == board[8]) {
      winner(player) }

    if (board[6] == board[4] && board[4] == board[2]) {
      winner(player)
    }
  }

  const check_draw = (board) => {

    for(let i = 0; i<=8; i++){
      if(){
        console.log("draw")
        gamestop = true
      }
    }

  }

  const winner = (player) => {
    gamestop = true
    document.querySelector('.winmsg b').textContent = `${player.name} won!`
    document.querySelector('.winmsg').style.visibility = 'visible';
    document.querySelectorAll('.boardbox').forEach(function (box, index){
      box.removeEventListener('click', (evt) => {
        updateBox(event.target);
      })
    })
  }

  return { start_game, switch_players, players, check_winner };
})();

const updateBox = (box) => {
  console.log(box.textContent.length)
  if (box.textContent === "X" || box.textContent === "O") {
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
    displayController.check_winner(gameBoard.board, displayController.players[0]);
  }
}

const createPlayers = () => {
  const playerO = player(document.querySelector('.playerO').value, "O")
  const playerX = player(document.querySelector('.playerX').value, "X")
  displayController.start_game(playerO, playerX)

}

const render = () => {

  createPlayers();
  document.querySelectorAll('.boardbox').forEach(function (box, index) {
    console.log(box);
    box.textContent = gameBoard.board[index]
    box.addEventListener('click', (evt) => {
      updateBox(event.target);
    })
  })

};
