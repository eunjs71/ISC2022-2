let handpose;
let handposeReady;
let handposeOn;
let video;
let videoOn;
let predictions = [];

let btns;

let btn_capture_on;
let btn_capture_off;

let btn_handpose_on;
let btn_handpose_off;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  handposeReady = false;
  handposeOn = false;
  videoOn = false;

  btn_capture_on = new Button("Captrue ON", 10, 10, 100, 30, turnOnCapture);
  btn_capture_off = new Button("Captrue OFF", 10, 50, 100, 30, turnOffCapture);
  btn_handpose_on = new Button("Handpose ON", 10, 90, 100, 30, turnOnHandpose);
  btn_handpose_off = new Button(
    "Handpose OFF",
    10,
    130,
    100,
    30,
    turnOffHandpose
  );

  btns = [btn_capture_on, btn_capture_off, btn_handpose_on, btn_handpose_off];
}

function modelReady() {
  handposeOn = true;
  console.log("Model ready!");
}

function draw() {
  fill(255);
  stroke(0);
  rect(0, 0, width, height);
  if (videoOn) {
    image(video, 0, 0, width, height);
  }
  if (handposeOn) {
    drawKeypoints();
  }
  btns.forEach((btn) => {
    btn.draw();
  });
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}

function mousePressed() {
  btns.forEach((btn) => {
    btn.mousePressed();
  });
}

class Button {
  constructor(text, x, y, w, h, onClickFunction) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.onClick = onClickFunction;
  }

  draw() {
    stroke(0);
    fill(255);
    if (this.isMouseOver()) {
      fill(220);
    }
    rect(this.x, this.y, this.w, this.h);
    fill(0);
    textAlign(CENTER, CENTER);
    text(this.text, this.x + this.w / 2, this.y + this.h / 2);
  }

  isMouseOver() {
    let xIn = mouseX > this.x && mouseX < this.x + this.w;
    let yIn = mouseY > this.y && mouseY < this.y + this.h;
    return xIn && yIn;
  }

  mousePressed() {
    if (this.isMouseOver()) {
      this.onClick();
    }
  }
}

function turnOnCapture() {
  console.log("video on");
  videoOn = true;
}

function turnOffCapture() {
  console.log("video off");
  videoOn = false;
}

function turnOnHandpose() {
  if (!handposeReady) {
    handposeReady = true;
    handpose = ml5.handpose(video, modelReady);
    handpose.on("predict", (results) => {
      predictions = results;
    });
  }
}

function turnOffHandpose() {
  if (handposeOn) {
    handpose.video = undefined;
    handposeReady = false;
    handposeOn = false;
  }
}
