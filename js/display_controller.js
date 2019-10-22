import gameBoard as gboard from './game_board.js';
import player as ply from './player.js';

const displayController = () => {
  let players;
  const start_game = (player1, player2) => {
    players = [player1, player2];
  };

  const switch_players = () => {
    [players[0], players[1]] = [players[1], players[0]];
  }
}();
