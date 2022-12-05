let inputString;
let cnv;
let inp;

function setup() {
  cnv = createCanvas(400, 400);
  let cnvRect = cnv.elt.getBoundingClientRect();

  inp = createInput("");
  inp.position(cnvRect.x + width / 2 - 50, cnvRect.y + 100);
  inp.size(100);
  inp.input(myInputEvent);

  inputString = "";
}

function draw() {
  fill(255);
  stroke(0);
  rect(0, 0, width, height);
  textAlign(CENTER, CENTER);
  fill(0);
  text(inputString, width / 2, height / 2);
}
function windowResized() {
  let cnvRect = cnv.elt.getBoundingClientRect();
  inp.position(cnvRect.x + width / 2 - 50, cnvRect.y + 100);
}

function myInputEvent() {
  inputString = `you are typing: ${this.value()} `;
}
