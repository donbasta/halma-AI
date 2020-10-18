const MAX_ATTEMPT = 100;

class SimulatedAnnealing {

  constructor(currentState) {
    this.state = currentState;
    this.player = this.state.player; // 1 = cari max, 2 = cari min
    this.value = util.utilityFunction(this.state);
    this.neighbors = util.generateNextState(this.state);
  }

  findNext() {
    let curValue = this.value;
    let attempt = 0;
    //let found = false;
    while(attempt < MAX_ATTEMPT) {
      let randomPosition = Math.floor(Math.random() * this.neighbors.length);
      let randomNeighbor = this.neighbors[randomPosition];
      let nextValue = util.utilityFunction(randomNeighbor);
      if (this.player == 1) {
        if (nextValue >= curValue) {
          this.nextMove = randomNeighbor;
          return;
        } else {
          let delta = Math.abs(curValue - nextValue);
          let temp = 10;
          let prob = 1.0 / Math.pow(Math.E, delta / temp);
          let random = Math.random();
          if(random <= prob) {
            this.nextMove = randomNeighbor;
            return;
          } else {
            attempt = attempt + 1;
          }
        }
      } else if (this.player == 2) {
        if (nextValue <= curValue) {
          this.nextMove = randomNeighbor;
          return;
        } else {
          let delta = Math.abs(curValue - nextValue);
          let temp = 10;
          let prob = 1.0 / Math.pow(Math.E, delta / temp);
          let random = Math.random();
          if(random <= prob) {
            this.nextMove = randomNeighbor;
            return;
          } else {
            attempt = attempt + 1;
          }
        }
      }
    }
    console.log("timeout");
  }

  getNext() {
    if(this.nextMove != undefined)
      return this.nextMove;
    console.log("undefined, either timeout or not searched yet");
  }
}