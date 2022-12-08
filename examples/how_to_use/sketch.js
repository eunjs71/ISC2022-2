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

class Platform {
  constructor(_x, _y, _w, _h) {
    (this.x = _x), (this.y = _y), (this.w = _w), (this.h = _h);
  }

  draw() {
    fill(0);
    stroke(0);
    rect(this.x, this.y, this.w, this.h);
  }

  isCollided(x, y) {
    let xIn = x >= this.x && x <= this.x + this.w;
    let yIn = y >= this.y && y <= this.y + this.h;
    return xIn && yIn;
  }
}

class Ball {
  constructor(_x, _y, _r) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.g = 0.2;
    this.vX = 3;
    this.vY = 0;
    this.vJ = -7.5;
    this.atBottom = false;
    this.moves = [false, false, false];
  }

  draw() {
    fill(0);
    stroke(0);
    circle(this.x, this.y, this.r);
  }

  move(platforms) {
    let direction = 0;
    if (this.moves[0]) {
      direction -= 1;
    }
    if (this.moves[2]) {
      direction += 1;
    }
    if (this.moves[1] && this.atBottom) {
      this.jump();
    }
    if (direction < 0) {
      this.moveLeft();
    }
    if (direction > 0) {
      this.moveRight();
    }
    this.x = constrain(this.x, this.r / 2, width - this.r / 2);

    this.vY += this.g;
    this.y += this.vY;

    for (let pf of platforms) {
      if (this.vY > 0) {
        if (pf.isCollided(this.x, this.y + this.r / 2)) {
          this.vY = 0;
          this.y = pf.y - this.r / 2;
          this.atBottom = true;
          break;
        }
      }
    }
  }

  moveLeft() {
    this.x -= this.vX;
  }

  moveRight() {
    this.x += this.vX;
  }

  jump() {
    this.vY = this.vJ;
    this.y += this.vY;
    this.atBottom = false;
  }

  keyPressed() {
    if (keyCode == LEFT_ARROW) {
      this.moves[0] = true;
    }
    if (keyCode == UP_ARROW) {
      this.moves[1] = true;
    }
    if (keyCode == RIGHT_ARROW) {
      this.moves[2] = true;
    }
  }

  keyReleased() {
    if (keyCode == LEFT_ARROW) {
      this.moves[0] = false;
    }
    if (keyCode == UP_ARROW) {
      this.moves[1] = false;
    }
    if (keyCode == RIGHT_ARROW) {
      this.moves[2] = false;
    }
  }
}
