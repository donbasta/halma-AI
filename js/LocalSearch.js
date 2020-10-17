

const MAX_ATTEMPT = 100;

class SimulatedAnnealing(currentState, player) {

  constructor(currentState, player) {
    this.state = currentState;
    this.player = player;
    this.value = util.utilityFunction(this.state);
    this.neighbors = util.generateNextState(currentState, player);
  }

  findNext() {
    let curValue = this.value;
    let attemp = 0;
    let found = false;
    while(!found && attempt < MAX_ATTEMPT) {
      let randomPosition = Math.floor(Math.random() * this.neighbors.length);
      let randomNeighbor = this.neighbors[randomPosition];
      let nextValue = util.utilityFunction(randomNeighbor);
      if (player == 1) {
        if (nextValue >= curValue) {
          return randomNeighbor;
        } else {
          let delta = Math.abs(curValue - nextValue);
          let prob = 1.0 / Math.pow(e, delta / temp);
          let random = Math.random();
          if(random <= prob) {
            return randomNeighbor;
          } else {
            attempt = attempt + 1;
          }
        }
      } else if (player == 2) {
        if (nextValue <= curValue) {
          return randomNeighbor;
        } else {
          let delta = Math.abs(curValue - nextValue);
          let prob = 1.0 / Math.pow(e, delta / temp);
          let random = Math.random();
          if(random <= prob) {
            return randomNeighbor;
          } else {
            attempt = attempt + 1;
          }
        }
      }
    }
  }
}