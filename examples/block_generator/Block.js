class Stone {
  constructor(_w, _h, _speed) {
    this.x = width + _w;
    this.y = 50;
    this.w = _w;
    this.h = _h;
    this.speed = _speed;
    this.c = 0;
  }
  move() {
    this.x -= this.speed;
  }
  draw() {
    fill(this.c);
    stroke(this.c);
    rect(this.x, this.y, this.w, this.h);
  }
}

class Bullet {
  constructor(_w, _h, _speed) {
    this.x = width + _w;
    this.y = 50;
    this.w = _w;
    this.h = _h;
    this.speed = _speed;
    this.c = color(255, 255, 0);
  }
  move() {
    this.x -= this.speed;
  }
  draw() {
    fill(this.c);
    stroke(this.c);
    rect(this.x, this.y, this.w, this.h);
  }
}

class Lava {
  constructor(_w, _h, _speed) {
    this.x = width + _w;
    this.y = 150;
    this.w = _w;
    this.h = _h;
    this.speed = _speed;
    this.c = color(255, 0, 0);
  }
  move() {
    this.x -= this.speed;
  }
  draw() {
    fill(this.c);
    stroke(this.c);
    rect(this.x, this.y, this.w, this.h);
  }
}
