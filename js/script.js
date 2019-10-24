/* eslint-env browser */
/* eslint no-unused-vars: [1, {"argsIgnorePattern": "[evt]"}] */

const gameBoard = (() => {
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

const reload = () => {
  window.location.reload();
};
const player = (name, mark) => ({ name, mark });

const displayController = (() => {
  const players = [];
  let gamestop = '';
  let rolls = 0;

  const startGame = (player1, player2) => {
    players[0] = player1;
    players[1] = player2;
    gamestop = false;
    rolls = 0;
  };

  const switchPlayers = (player1, player2) => {
    if (document.querySelector('.winmsg b').textContent.length === 0
          && document.querySelector('.errormsg b').textContent.length === 0) {
      document.querySelector('.playersturn').style.visibility = 'visible';
      document.querySelector('.playersturn').textContent = `${player2.name} turn`;
      players[0] = player2;
      players[1] = player1;
    } else {
      document.querySelector('.playersturn').style.visibility = 'hidden';
    }
  };

  const winner = () => {
    gamestop = true;
    document.querySelector('.winmsg b').textContent = `${displayController.players[0].name} won!`;
    document.querySelector('.winmsg').style.visibility = 'visible';
    document.querySelectorAll('.boardbox').forEach((box) => {
      const newBox = box.cloneNode(true);
      box.parentNode.replaceChild(newBox, box);
    });
  };

  const checkHorizontal = (board) => {
    for (let i = 0; i < 3; i += 1) {
      if (board[0 + i * 3] === board[1 + i * 3] && board[1 + i * 3] === board[2 + i * 3]) {
        winner();
      }
    }
  };

  const checkVertical = (board) => {
    for (let i = 0; i < 3; i += 1) {
      if (board[0 + i] === board[3 + i] && board[3 + i] === board[6 + i]) {
        winner();
      }
    }
  };

  const checkDiagonal = (board) => {
    if (board[0] === board[4] && board[4] === board[8]) {
      winner();
    }

    if (board[6] === board[4] && board[4] === board[2]) {
      winner();
    }
  };

  const draw = () => {
    gamestop = true;
    document.querySelector('.winmsg b').textContent = 'It\'s a draw';
    document.querySelector('.winmsg').style.visibility = 'visible';
    document.querySelectorAll('.boardbox').forEach((box) => {
      const newBox = box.cloneNode(true);
      box.parentNode.replaceChild(newBox, box);
    });
  };

  const checkDraw = () => {
    if (gamestop === false) {
      gamestop = true;
      draw();
    }
  };

  const checkWinner = (board) => {
    checkHorizontal(board);
    checkVertical(board);
    checkDiagonal(board);
    rolls += 1;
    if (rolls === 9) {
      checkDraw();
    }
  };

  return {
    startGame, switchPlayers, players, checkWinner, rolls,
  };
})();

const updateBox = (box) => {
  if (box.textContent === 'X' || box.textContent === 'O') {
    document.querySelector('.playersturn').style.visibility = 'hidden';
    document.querySelector('.errormsg').style.visibility = 'visible';
    document.querySelector('.errormsg b').textContent = 'Invalid move!';
    setTimeout(() => {
      document.querySelector('.errormsg').style.visibility = 'hidden';
      document.querySelector('.errormsg b').textContent = '';
      document.querySelector('.playersturn').style.visibility = 'visible';
    }, 800);
  } else {
    gameBoard.addPosition(box.textContent, displayController.players[0].mark);
    box.textContent = displayController.players[0].mark;
    if (box.textContent === 'X') {
      box.style.background = '#F0E68C';
    } else {
      box.style.background = '#FFFACD';
    }
    displayController.checkWinner(gameBoard.board);
    displayController.switchPlayers(displayController.players[0], displayController.players[1]);
  }
};

const createPlayers = () => {
  if (document.querySelector('.playerO').value.length !== 0 && document.querySelector('.playerO').value.length !== 0) {
    const playerO = player(document.querySelector('.playerO').value, 'O');
    const playerX = player(document.querySelector('.playerX').value, 'X');
    displayController.startGame(playerO, playerX);
    return true;
  }
  return false;
};

const startGame = () => {
  if (createPlayers()) {
    document.querySelector('.boardcont').style.display = 'block';
    document.querySelector('.gamestarter').style.display = 'none';
    // document.querySelectorAll('.boardrow').forEach(row => {
  //   row.style.display = 'block';
  // });
  } else {
    document.querySelector('.playernames').style.visibility = 'visible';
    setTimeout(() => {
      document.querySelector('.playernames').style.visibility = 'hidden';
    }, 800);
  }
};

const render = () => {
  createPlayers();
  document.querySelectorAll('.boardbox').forEach((box, index) => {
    box.textContent = gameBoard.board[index];
    box.addEventListener('click', (evt) => {
      updateBox(window.event.target);
    });
  });
};

const newGame = () => {
  document.querySelector('.winmsg').style.visibility = 'hidden';
  document.querySelector('.winmsg b').textContent = '';
  gameBoard.board = gameBoard.resetBoard();
  document.querySelectorAll('.boardbox').forEach((box) => {
    box.style.background = '#fff';
  });
  render();
};

 window.startGame = startGame;
 window.reload = reload;
 window.newGame = newGame;