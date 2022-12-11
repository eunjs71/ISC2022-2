let stage;

let btn_drawing;
let btn_back;

let pg_drawing;

let img_pen;

function preload() {
  img_pen = loadImage("pen.png");
}

function setup() {
  createCanvas(400, 400);
  stage = "MAIN";
  btn_drawing = new Button(
    "DRAW",
    width / 2,
    height * 0.75,
    100,
    30,
    onClickDraw
  );
  btn_back = new Button(
    "BACK",
    width * 0.8,
    height * 0.1,
    100,
    30,
    onClickBack
  );

  pg_drawing = createGraphics(width, height);
}

function draw() {
  if (stage == "MAIN") {
    draw_main();
    return;
  }
  if (stage == "DRAWING") {
    draw_drawing();
    return;
  }
}

function draw_main() {
  fill(255);
  stroke(0);
  rect(0, 0, width, height);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("DRAWING", width / 2, height / 2 - 60);
  text("WITH", width / 2, height / 2 - 30);
  text("PEN", width / 2, height / 2);
  btn_drawing.draw();
}

function draw_drawing() {
  fill(255);
  stroke(0);
  rect(0, 0, width, height);
  if (mouseIsPressed) {
    pg_drawing.stroke(0);
    pg_drawing.line(mouseX, mouseY, pmouseX, pmouseY);
  }

  image(pg_drawing, 0, 0);
  btn_back.draw();
  image(img_pen, mouseX, mouseY - 20, 20, 20);
}

function mousePressed() {
  if (stage == "MAIN") {
    btn_drawing.mousePressed();
    return;
  }
  if (stage == "DRAWING") {
    btn_back.mousePressed();
    return;
  }
}

function onClickDraw() {
  stage = "DRAWING";
  noCursor();
}

function onClickBack() {
  stage = "MAIN";
  pg_drawing.clear();
  cursor();
}

class Button {
  constructor(text, x, y, w, h, onClick) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.onClick = onClick;
  }
  draw() {
    stroke(0);
    fill(255);
    if (this.isMouseOn()) {
      fill(220);
    }
    rect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(12);
    text(this.text, this.x, this.y);
  }
  isMouseOn() {
    let xIn = mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2;
    let yIn = mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2;
    return xIn && yIn;
  }
  mousePressed() {
    if (this.isMouseOn()) {
      this.onClick();
    }
  }
}
