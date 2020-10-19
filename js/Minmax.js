const DEPTH = 3;
// const INF = 1000000000;

//implement the node of the minimax tree
class Node {
  constructor(state) {
    this.state = state;
    this.minimax = null;
    this.children = [];
  }
}

//create the tree and fill the tree using minimax algo
class MinimaxTree {
  constructor(currentState, depth, pruning) {
    this.root = new Node(currentState);
    if (!pruning) {
      this.expand(this.root, depth);
    } else {
      this.expandPruning(this.root, depth, -INF, INF);
    }
  }

  expand(node, depth) {
    if (depth == 0) {
      node.minimax = utilityFunction(node.state.board, node.state.player);
      return;
    }

    let tempValue;
    if (node.state.player === 1) {
      tempValue = -INF;
    } else if (node.state.player === 2) {
      tempValue = INF;
    }

    let neighbors = generateNextState(node.state);
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      let childNode = new Node(neighbor);
      this.expand(childNode, depth - 1);
      node.children.push(childNode);
      if (node.state.player == 1) {
        tempValue = Math.max(tempValue, childNode.minimax);
      } else if (node.state.player == 2) {
        tempValue = Math.min(tempValue, childNode.minimax);
      }
    }
    node.minimax = tempValue;
  }

  //for alpha-beta pruning, not fixed yet
  expandPruning(node, depth, alpha, beta) {
    if (depth == 0) {
      node.minimax = utilityFunction(node.state.board, node.state.player);
      return;
    }

    let tempValue;
    if (node.state.player == 1) {
      tempValue = -INF;
    } else if (node.state.player == 2) {
      tempValue = INF;
    }

    let neighbors = generateNextState(node.state);
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      let childNode = new Node(neighbor);
      this.expandPruning(childNode, depth - 1, alpha, beta);
      node.children.push(childNode);
      if (node.state.player == 1) {
        tempValue = Math.max(tempValue, childNode.minimax);
        if (tempValue >= beta) {
          break;
        }
        alpha = Math.max(alpha, tempValue);
      } else if (node.state.player == 2) {
        tempValue = Math.min(tempValue, childNode.minimax);
        if (tempValue <= alpha) {
          break;
        }
        beta = Math.min(beta, tempValue);
      }
    }
    node.minimax = tempValue;
  }
}

//current game state and which player is moving
class Minimax {
  constructor(state, depth, pruning) {
    this.tree = new MinimaxTree(state, depth, pruning);
    this.value = this.tree.root.minimax;
    this.neighbors = generateNextState(state);
    this.player = state.player;
  }

  getMoveBest() {
    let ret;
    this.tree.root.children.forEach (neighbor => {
      if (neighbor.minimax == this.value) {
        ret = neighbor.state;
      }
    });
    this.nextMoveBest = ret;
  }

  getMoveRandom() {
    const MAX_ATTEMPT = 100;
    let curValue = this.value;
    let attempt = 0;
    //let found = false;
    while(attempt < MAX_ATTEMPT) {
      let randomPosition = Math.floor(Math.random() * this.neighbors.length);
      let randomNeighbor = this.neighbors[randomPosition];
      let nextValue = utilityFunction(randomNeighbor, this.player);
      if (this.player == 1) {
        if (nextValue >= curValue) {
          this.nextMoveRandom = randomNeighbor;
          return;
        } else {
          let delta = Math.abs(curValue - nextValue);
          let temp = 10;
          let prob = 1.0 / Math.pow(Math.E, delta / temp);
          let random = Math.random();
          if(random <= prob) {
            this.nextMoveRandom = randomNeighbor;
            return;
          } else {
            attempt = attempt + 1;
          }
        }
      } else if (this.player == 2) {
        if (nextValue <= curValue) {
          this.nextMoveRandom = randomNeighbor;
          return;
        } else {
          let delta = Math.abs(curValue - nextValue);
          let temp = 10;
          let prob = 1.0 / Math.pow(Math.E, delta / temp);
          let random = Math.random();
          if(random <= prob) {
            this.nextMoveRandom = randomNeighbor;
            return;
          } else {
            attempt = attempt + 1;
          }
        }
      }
    }
    console.log("Timeout");
  }
}

function botMove(gameState, botType) {
  // console.log(gameState.player)
  let botMoveMinimaxPruning = new Minimax(gameState, 3, true)
  let bestMove = null
  if (botType === "minimax") {
      botMoveMinimaxPruning.getMoveBest()
      bestMove = botMoveMinimaxPruning.nextMoveBest
  }
  if (botType === "minimax-local-search") {
      botMoveMinimaxPruning.getMoveRandom()
      bestMove = botMoveMinimaxPruning.nextMoveRandom
      if (!bestMove) {
        botMoveMinimaxPruning.getMoveBest()
        bestMove = botMoveMinimaxPruning.nextMoveBest
      }
  }
  console.log(bestMove)
  // console.log(gameState)
  // console.log(bestMove.board)
  let compareResult = compareGameState(gameState, bestMove)
  setTimeout(() => {
      let sourcePosToClick = getCell(compareResult[0][0], compareResult[0][1])
      sourcePosToClick.click()
      // console.log('tetot')
      setTimeout(() => {
          let targetPosToClick = getCell(compareResult[1][0], compareResult[1][1])
          targetPosToClick.click()
      }, 10)
  }, 10)
}

//----------------------------------------------------------------------------------------

// TEST

// function getNanoSecTime() {
//   const hrTime = process.hrtime();
//   return hrTime[0] * 1000000000 + hrTime[1];
// }

// let state1 = new GameState(null, 8, 1);
// let pruneAwal = getNanoSecTime();
// let botMoveMinimaxPruning = new Minimax(state1, 3, true);
// botMoveMinimaxPruning.getMoveBest();
// let pruneAkhir = getNanoSecTime();
// console.log(`value with pruning: ${botMoveMinimaxPruning.value}`);
// console.log(pruneAwal);
// console.log(pruneAkhir);
// console.log(`With pruning: ${pruneAkhir - pruneAwal} ns`);


// let state2 = new GameState(null, 20, 1);
// let noPruneAwal = getNanoSecTime();
// let botMoveMinimax = new Minimax(state2, 3, false);
// botMoveMinimax.getMoveBest();
// let noPruneAkhir = getNanoSecTime();
// console.log(`value without pruning: ${botMoveMinimax.value}`);
// console.log(noPruneAwal);
// console.log(noPruneAkhir);
// console.log(`Without pruning: ${noPruneAkhir - noPruneAwal} ns`);