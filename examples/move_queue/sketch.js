let ball;
let platforms;

function setup() {
  createCanvas(400, 400);
  ball = new Ball(width / 5, height / 2, 10);
  let platform1 = new Platform(0, 350, 400, 50);
  let platform2 = new Platform(150, 250, 100, 20);

  platforms = [platform1, platform2];
}

function draw() {
  fill(255);
  stroke(0);
  rect(0, 0, width, height);

  for (let pf of platforms) {
    pf.draw();
  }

  ball.move(platforms);
  ball.draw();
}

function keyPressed() {
  ball.keyPressed();
}

function keyReleased() {
  ball.keyReleased();
}
