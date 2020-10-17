/** CONSTANTS **/
const INF = 99999999999;
const DX = [0, 0, 1, -1, 1, 1, -1, -1];
const DY = [1, -1, 0, 0, -1, 1, 1, -1];

function findAvailablePositions(x, y, state) {
    const BSize = state.length;
    let retPositions = [];

    if (state[x][y] == 0) return retPositions;
    
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
            if (state[tx][ty] != 0) {
                tx += DX[i], ty += DY[i];
                if (tx < 0 || ty < 0 || tx >= BSize || ty >= BSize) continue;
                if (visited[tx][ty]) continue;
                if (state[tx][ty] != 0) continue;
                visited[tx][ty] = 1;
                retPositions.push([tx, ty]);
                queue.push([tx, ty, false]);
            } else if (expand) {
                visited[tx][ty] = 1;
                retPositions.push([tx, ty]);
            }
        }
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

function utilityFunction(state) {
  const BSize = state.length;
  
  function F(playerType) {
    const otherPlayer = (3 - playerType);
    let retValue = 0;

    let pawnPositions = [];
    let targetCornerPosition = [];

    for (let i = 0; i < BSize; i++) {
      for (let j = 0; j < BSize; j++) {
        if (state[i][j] == playerType) {
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

  return F(1) - F(2);
}

// let state = [
//   [0, 0, 0, 0, 0],
//   [1, 0, 0, 2, 2],
//   [1, 1, 1, 0, 0],
//   [1, 1, 1, 0, 0],
//   [1, 1, 1, 1, 0]
// ];
// // console.log(utilityFunction(state));
// console.log(findAvailablePositions(2, 2, state).sort());

