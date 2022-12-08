function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

class ScoreBoard {
  constructor() {
    this.scores = [];
    for (let i = 0; i < 10; i++) {
      this.scores.push({ name: "________", score: 0 });
    }
  }
}
