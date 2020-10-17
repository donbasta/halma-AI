
const DEPTH = 3;
const INF = 1000000000;

//implement the node of the minmax tree
class Node(state) {
  constructor(state) {
    this.state = state;
    this.minmax = null;
    this.children = [];
  }
}

//create the tree and fill the tree using minmax algo
class MinmaxTree(currentState, depth, player) {
  constructor(currentState, depth, player) {
    this.root = new Node(currentState);
    expand(this.root, depth, player);
  }

  expand(node, depth, player) {
    if (depth == 0) {
      this.node.minmax = util.utilityFunction(state);
      return;
    }
    let temp_value;
    if (player == 1) {
      temp_value = -INF;
    } else if (player == 2) {
      temp_value = INF;
    }
    neighbors = util.generateNextState(node.state, player);
    for each (let neighbor in neighbors) {
      childNode = new Node(neighbor);
      let other_player = 3 - player;
      expand(childNode, depth - 1, other_player);
      node.children.push(childNode);
      if (player == 1) {
        temp_value = max(temp_value, childNode.minmax);
      } else {
        temp_value = min(temp_value, childNode.minmax);
      }
    }
    this.node.minmax = temp_value;
  }
}

//current game state and which player is moving
class Minmax(state, depth, player) {
  constructor(state, depth, player) {
    this.tree = new MinmaxTree(state, depth, player);
    for each (let neighbor in tree.root.children) {
      if (neighbor.minmax == tree.root.minmax) {
        return neighbor.state;
      }
    }
  }
}

//
class MinmaxLocalSearch(state, depth, player) {

}

let state = [[1,1,1,1,1,0,0,0], 
             [1,1,1,1,1,0,0,0],
             [1,1,1,1,0,0,0,0],
             [1,1,1,0,0,0,2,2],
             [1,1,0,0,0,2,2,2],
             [0,0,0,0,2,2,2,2],
             [0,0,0,2,2,2,2,2],
             [0,0,0,2,2,2,2,2]];



