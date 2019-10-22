import displayController as dc from './js/display_controller';
import gameBoard as gboard from './js/game_board';
import player as ply from './js/player';

var render = () => {

    document.querySelectorAll('.boardbox').forEach(function (box, index){
        box.value = gboard.board[index]
    })

};
(function main() {
    render();
  }();