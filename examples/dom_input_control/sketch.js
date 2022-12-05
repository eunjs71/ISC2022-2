let cnv;
let input_name;
let inputX;
let inputY;

let name_interface;

function setup() {
  cnv = createCanvas(400, 400);
  let cnvRect = cnv.elt.getBoundingClientRect();
  let inputX = width / 2 - 50;
  let inputY = height / 2 - 30;
  input_name = createInput("");
  input_name.position(cnvRect.x + inputX, cnvRect.y + inputY);
  input_name.size(100);
  input_name.input(myInputEvent);

  name_interface = new NameInterface(input_name);
}

function draw() {
  fill(255);
  stroke(0);
  rect(0, 0, width, height);
  textAlign(CENTER, CENTER);
  fill(0);
  text(`이름: ${name_interface.name.trim()}`, width / 2, height / 2);
  name_interface.draw();
}

function windowResized() {
  let cnvRect = cnv.elt.getBoundingClientRect();
  input_name.position(cnvRect.x + inputX, cnvRect.y + inputY);
}

function myInputEvent() {
  inputString = `you are typing: ${this.value()} `;
}

function mousePressed() {
  name_interface.mousePressed();
}

class NameInterface {
  constructor(input) {
    this.name = "";
    this.windowOpenBtn = new Button("입력", width / 2, height * 0.75, 100, 30);
    this.windowCloseBtn = new Button("확인", width / 2, height * 0.6, 100, 30);
    this.input = input;
    this.inputShow = false;
    this.input.hide();
  }
  draw() {
    this.windowOpenBtn.draw();
    if (this.inputShow) {
      this.drawWindow();
    }
  }

  drawWindow() {
    stroke(0);
    fill(255);
    rect(width / 8, height / 4, width * 0.75, height / 2);
    fill(0);
    textAlign(CENTER, CENTER);
    text("이름을 입력하세요.", width / 2, height * 0.35);
    this.windowCloseBtn.draw();
  }
  mousePressed() {
    if (!this.inputShow) {
      if (this.windowOpenBtn.isMouseOver()) {
        this.inputShow = true;
        this.input.show();
      }
    } else {
      if (this.windowCloseBtn.isMouseOver()) {
        this.name = this.input.value();
        this.inputShow = false;
        this.input.hide();
      }
    }
  }
}

class Button {
  constructor(text, x, y, w, h) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw() {
    stroke(0);
    fill(255);
    if (this.isMouseOver()) {
      fill(200);
    }
    rect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    fill(0);
    textAlign(CENTER, CENTER);
    text(this.text, this.x, this.y);
  }
  isMouseOver() {
    let mouseXIn = mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2;
    let mouseYIn = mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2;
    return mouseXIn && mouseYIn;
  }
}
