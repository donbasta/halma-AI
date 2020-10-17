/** CONSTANTS **/
const INF = 99999999999;

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

/** Test for Debugging 
let state = [
  [0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [1, 1, 1, 0, 0],
  [1, 1, 1, 1, 0]
];

console.log(utilityFunction(state));
 ***/

