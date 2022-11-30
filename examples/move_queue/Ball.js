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
          // this.atBottom = true;
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
}
