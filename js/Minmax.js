const DEPTH = 3;
const INF = 1000000000;

//implement the node of the minmax tree
class Node {
  constructor(state) {
    this.state = state;
    this.minmax = null;
    this.children = [];
  }
}

//create the tree and fill the tree using minmax algo
class MinmaxTree {
  constructor(currentState, depth) {
    this.root = new Node(currentState);
    this.expand(this.root, depth);
  }

  expand(node, depth) {
    if (depth == 0) {
      node.minmax = utilityFunction(node.state.board);
      return;
    }
    let temp_value;
    if (node.state.player == 1) {
      temp_value = -INF;
    } else if (node.state.player == 2) {
      temp_value = INF;
    }
    let neighbors = generateNextState(node.state);
    neighbors.forEach (neighbor => {
      let childNode = new Node(neighbor);
      this.expand(childNode, depth - 1);
      node.children.push(childNode);
      if (node.state.player == 1) {
        temp_value = Math.max(temp_value, childNode.minmax);
      } else if (node.state.player == 2) {
        temp_value = Math.min(temp_value, childNode.minmax);
      }
    });
    node.minmax = temp_value;
  }
}

//current game state and which player is moving
class Minmax {
  constructor(state, depth) {
    this.tree = new MinmaxTree(state, depth);
    this.value = this.tree.root.minmax;
    this.neighbors = generateNextState(state);
    this.player = state.player;
  }

  getMoveBest() {
    let ret;
    this.tree.root.children.forEach (neighbor => {
      if (neighbor.minmax == this.value) {
        ret = neighbor.state;
      }
    });
    return ret;
  }

  getMoveRandom() {
    const MAX_ATTEMPT = 100;
    let curValue = this.value;
    let attempt = 0;
    let found = false;
    while(!found && attempt < MAX_ATTEMPT) {
      let randomPosition = Math.floor(Math.random() * this.neighbors.length);
      let randomNeighbor = this.neighbors[randomPosition];
      let nextValue = utilityFunction(randomNeighbor);
      if (this.player == 1) {
        if (nextValue >= curValue) {
          return randomNeighbor;
        } else {
          let delta = Math.abs(curValue - nextValue);
          let temp = 10;
          let prob = 1.0 / Math.pow(Math.E, delta / temp);
          let random = Math.random();
          if(random <= prob) {
            return randomNeighbor;
          } else {
            attempt = attempt + 1;
          }
        }
      } else if (this.player == 2) {
        if (nextValue <= curValue) {
          return randomNeighbor;
        } else {
          let delta = Math.abs(curValue - nextValue);
          let temp = 10;
          let prob = 1.0 / Math.pow(Math.E, delta / temp);
          let random = Math.random();
          if(random <= prob) {
            return randomNeighbor;
          } else {
            attempt = attempt + 1;
          }
        }
      }
    }
    console.log("Timeout");
  }
}

// let state = new GameState(null, 8, 1);
// let botMoveMinmax = new Minmax(state, 3);
// console.log("next move to choose using minmax: ", botMoveMinmax.getMoveBest());
// console.log("next move to choose using minmax + localsearch: ", botMoveMinmax.getMoveRandom());





