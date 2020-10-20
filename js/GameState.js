
const CNT_16 = [5, 5, 4, 3, 2];
const CNT_10 = [5, 4, 3, 2, 1];
const CNT_8 = [4, 3, 2, 1];

class GameState {
  constructor(board, size, player) {
    if (board == null) {
      this.initState(size);
    } else {
      this.size = board.length;
      this.board = board;
    }    
    this.player = player;
  }

  initState(size) {
    this.size = size;
    this.board = new Array(this.size);
    this.clickState = new Array(this.size);
    this.selectedCell = null;
    for (let i = 0; i < this.size; i++) {
      this.board[i] = new Array(this.size);
      this.clickState[i] = new Array(this.size);
      for(let j = 0; j < this.size; j++) {
        this.board[i][j] = 0;
        this.clickState[i][j] = 0;
      }
    }
    let pawnConfig = null;
    if(size == 8) {
      pawnConfig = CNT_8;
    } else if (size == 10) {
      pawnConfig = CNT_10;
    } else if (size == 16) {
      pawnConfig = CNT_16;
    }
    for (let i = 0; i < pawnConfig.length; i++) {
      for (let j = 0; j < pawnConfig[i]; j++) {
        this.board[i][j] = 1;
        this.board[this.size - i - 1][this.size - j - 1] = 2;
        this.clickState[i][j] = 1;
        this.clickState[this.size - i - 1][this.size - j - 1] = 1;
      }
    }
  }
}

//let testGame = new GameState(8);
//console.log(testGame.board);