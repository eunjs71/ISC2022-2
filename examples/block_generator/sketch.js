let blockController;

function setup() {
  createCanvas(600, 200);
  blockController = new BlockController();
}

function draw() {
  fill(255);
  stroke(0);
  rect(0, 0, width, height);
  fill(0);
  rect(0, 0, width, 50);
  rect(0, height, width, -50);
  blockController.moveBlocks();
  blockController.drawBlocks();
}
