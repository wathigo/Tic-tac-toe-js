import displayController as dc from './display_controller.js';


var render = () => {

    document.querySelectorAll('.boardbox').forEach(function (box, index){
        box.value = dc.gboard.board[index]
    })

};
(function main() {
    render();
  }());