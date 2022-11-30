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
