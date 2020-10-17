const MAX_ATTEMPT = 100;

class SimulatedAnnealing {

  constructor(currentState) {
    this.state = currentState;
    this.player = this.state.player;
    this.value = util.utilityFunction(this.state);
    this.neighbors = util.generateNextState(this.state);
  }

  findNext() {
    let curValue = this.value;
    let attempt = 0;
    let found = false;
    while(!found && attempt < MAX_ATTEMPT) {
      let randomPosition = Math.floor(Math.random() * this.neighbors.length);
      let randomNeighbor = this.neighbors[randomPosition];
      let nextValue = util.utilityFunction(randomNeighbor);
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
    console.log("timeout");
  }
}