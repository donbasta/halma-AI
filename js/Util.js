/** CONSTANTS **/
const INF = 99999999999;
const DX = [0, 0, 1, -1, 1, 1, -1, -1];
const DY = [1, -1, 0, 0, -1, 1, 1, -1];

function findAvailablePositions(x, y, board) {
  const BSize = board.length;
  let retPositions = [];

  if (board[x][y] == 0) return retPositions;
  let queue = [];
  queue.push([x, y, true]);

  let visited = new Array(BSize);
  for (let i = 0; i < BSize; i++) {
    visited[i] = new Array(BSize);
    for (let j = 0; j < BSize; j++) {
      visited[i][j] = 0;
    }
  }
  visited[x][y] = 1;

  while (queue.length > 0) {
    const top = queue[0];
    queue.shift();
    const cx = top[0];
    const cy = top[1];
    const expand = top[2];
    for (let i = 0; i < DX.length; i++) {
      let tx = cx + DX[i];
      let ty = cy + DY[i];
      if (tx < 0 || ty < 0 || tx >= BSize || ty >= BSize) continue;
      if (visited[tx][ty]) continue;
      if (board[tx][ty] != 0) {
        tx += DX[i], ty += DY[i];
        if (tx < 0 || ty < 0 || tx >= BSize || ty >= BSize) continue;
        if (visited[tx][ty]) continue;
        if (board[tx][ty] != 0) continue;
        visited[tx][ty] = 1;
        retPositions.push([tx, ty]);
        queue.push([tx, ty, false]);
      } else if (expand) {
        visited[tx][ty] = 1;
        retPositions.push([tx, ty]);
      }
    }
	}
	
	const playerType = board[x][y];
	const otherPlayer = 3 - board[x][y];
	if (positionInCorner(x, y, BSize, otherPlayer)) {
		/** if in a corner of enemy, must always be in the corner enemy */
		retPositions = retPositions.filter((pos) => {
			return positionInCorner(pos[0], pos[1], BSize, otherPlayer);
		});
	} else if (!positionInCorner(x, y, BSize, playerType)) {
		/** if outside self corner, must always be outside self corner */
		retPositions = retPositions.filter((pos) => {
			return !(positionInCorner(pos[0], pos[1], BSize, playerType));
		});
	}

  return retPositions;
}

function positionInCorner(x, y, BSize, playerType) {
  if (playerType == 2) {
    x = BSize - x - 1;
    y = BSize - y - 1;
  }
  if (x == 5 || y == 5) return false;
  return (x + y <= 5);
}

function utilityFunction(board) {
  const BSize = board.length;
  
  function F(playerType) {
    const otherPlayer = (3 - playerType);
    let retValue = 0;

    let pawnPositions = [];
    let targetCornerPosition = [];

    for (let i = 0; i < BSize; i++) {
      for (let j = 0; j < BSize; j++) {
        if (board[i][j] == playerType) {
          pawnPositions.push([i, j]);
        }
        if (positionInCorner(i, j, BSize, otherPlayer)) {
          targetCornerPosition.push([i, j]);
        }
      }
    }

    for (let i = 0; i < pawnPositions.length; i++) {
      const pawn = pawnPositions[i];
      let curValue = INF;
      for (let j = 0; j < targetCornerPosition.length; j++) {
        const target = targetCornerPosition[j];
        const distance = Math.abs(pawn[0] - target[0]) + Math.abs(pawn[1] - target[1]);
        curValue = Math.min(curValue, distance);
      }
      retValue += curValue;
    }

    return retValue;
  }

  return F(2) - F(1);
}

function generateNextState(state) {
  board = state.board;
  retNextStates = []
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if(board[i][j] != state.player) {
        continue;
      }
      nextPositions = findAvailablePositions(i, j, board);
      nextPositions.forEach (nxt => {
        let tempBoard = new Array(board.length);
        for (let i = 0; i < board.length; i++) {
          tempBoard[i] = new Array(board.length);
          for (let j = 0; j < board.length; j++) {
            tempBoard[i][j] = board[i][j];
          }
        }
        let temp = tempBoard[i][j];
        tempBoard[i][j] = tempBoard[nxt[0]][nxt[1]];
        tempBoard[nxt[0]][nxt[1]] = temp;
        let tempState = new GameState(tempBoard, tempBoard.length, 3 - state.player);
        retNextStates.push(tempState);
      });   
    }
  }
  return retNextStates;
}

// For Debugging Purposes
// let board = [
// 	[0, 0, 0, 0, 0, 1, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0]
// ];
// console.log(utilityFunction(board));
// console.log(findAvailablePositions(0, 5, board).sort());
