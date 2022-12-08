let scoreBoard;

let btn_start;
let btn_ranking;
let btn_stop;
let btn_main;
let btn_next;

let stage;
let score;

let cnv;
let input_name;

function setup() {
  cnv = createCanvas(400, 400);
  textFont("Courier");
  scoreBoard = new ScoreBoard();
  stage = "MAIN";
  btn_start = new Button("START", width / 2, 250, 100, 30, goGameStart);
  btn_ranking = new Button("RANKING", width / 2, 300, 100, 30, goRanking);
  btn_stop = new Button("STOP", width / 2, 300, 100, 30, gameEnd);
  btn_main = new Button("GO TO MAIN", width / 2, 300, 100, 30, goMain);
  btn_next = new Button("NEXT", width / 2, 300, 100, 30, addRank);

  setup_input_name();
}

function draw() {
  if (stage == "MAIN") {
    draw_main();
    return;
  }
  if (stage == "GAME_START") {
    draw_game_start();
    return;
  }
  if (stage == "GAME_END") {
    draw_game_end();
    return;
  }
  if (stage == "NEW_SCORE") {
    draw_new_score();
    return;
  }
  if (stage == "RANKING") {
    draw_ranking();
    return;
  }
}

function mousePressed() {
  if (stage == "MAIN") {
    btn_start.mousePressed();
    btn_ranking.mousePressed();
    return;
  }
  if (stage == "GAME_START") {
    btn_stop.mousePressed();
    return;
  }
  if (stage == "GAME_END") {
    btn_main.mousePressed();
    return;
  }
  if (stage == "NEW_SCORE") {
    btn_next.mousePressed();
    return;
  }
  if (stage == "RANKING") {
    btn_main.mousePressed();
    return;
  }
}

// DRAW FUNCTIONS

function draw_main() {
  background(0);
  drawThreeLineMsg(["RANDOM", "NUMBER", "GAME"]);
  btn_start.draw();
  btn_ranking.draw();
}

function draw_game_start() {
  background(0);
  drawThreeLineMsg(["PICK", "RANDOM", "NUMBER"]);
  score = int(random(100));
  text(score, width / 2, height / 2);
  btn_stop.draw();
}
function draw_game_end() {
  background(0);
  drawThreeLineMsg(["GAME", "", "OVER"]);
  text(score, width / 2, height / 2);
  btn_main.draw();
}
function draw_new_score() {
  background(0);
  drawThreeLineMsg(["NEW", "HIGH", "SCORE"]);
  text(score, width / 2, height / 2);
  btn_next.draw();
}
function draw_ranking() {
  background(0);
  drawThreeLineMsg(["HIGH", "", "SCORES"]);
  scoreBoard.draw();
  btn_main.draw();
}

function drawThreeLineMsg(msgs) {
  fill(0, 255, 0);
  textAlign(CENTER, CENTER);
  textSize(24);
  text(padStr(msgs[0]), width / 2, 100);
  text(padStr(msgs[1]), width / 2, 125);
  text(padStr(msgs[2]), width / 2, 150);
}
function padStr(msg) {
  if (msg.length == 5) {
    return `${msg}X`;
  }
  if (msg.length == 4) {
    return `X${msg}X`;
  }
  if (msg.length == 3) {
    return `X${msg}XX`;
  }
  if (msg.length == 2) {
    return `XX${msg}XX`;
  }
  if (msg.length == 1) {
    return `XX${msg}XXX`;
  }
  if (msg.length == 0) {
    return `XXXXXX`;
  }
  return msg;
}

// BUTTON ON_CLICK FUNCTIONS

function goGameStart() {
  stage = "GAME_START";
}
function goRanking() {
  stage = "RANKING";
}
function goMain() {
  stage = "MAIN";
}
function gameEnd() {
  if (scoreBoard.isNewRank(score)) {
    stage = "NEW_SCORE";
    input_name.value("");
    input_name.show();
    return;
  }
  stage = "GAME_END";
}
function addRank() {
  if (input_name.value().length > 0) {
    stage = "RANKING";
    scoreBoard.addRank(input_name.value(), score);
    input_name.hide();
  }
}

// CLASSES

class ScoreBoard {
  constructor() {
    this.scores = [];
    for (let i = 0; i < 5; i++) {
      this.scores.push({ name: "________", score: 0 });
    }
  }
  draw() {
    for (let i = 0; i < 5; i++) {
      let rank = i + 1;
      let rank_name = this.scores[i].name;
      let rank_name_str = rank_name.padEnd(8, "_");
      let rank_score = this.scores[i].score;
      let rank_score_str = nf(rank_score, 2);
      fill(0, 255, 0);
      textAlign(CENTER, CENTER);
      textSize(12);
      let rank_text = `${rank}. ${rank_name_str} ${rank_score_str}`;
      text(rank_text, width / 2, 180 + 20 * i);
    }
  }
  isNewRank(new_score) {
    let lastScore = this.scores[this.scores.length - 1].score;
    return new_score > lastScore;
  }
  addRank(new_name, new_score) {
    this.scores.push({ name: new_name, score: new_score });
    this.scores.sort((a, b) => a.score - b.score).reverse();
    this.scores = this.scores.slice(0, 5);
  }
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
    stroke(0, 255, 0);
    fill(0);
    if (this.isMouseOn()) {
      fill(0, 255, 0, 50);
    }
    rect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    textSize(12);
    textAlign(CENTER, CENTER);
    fill(0, 255, 0);
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

// SETUP INPUT_NAME
function setup_input_name() {
  let cnvRect = cnv.elt.getBoundingClientRect();

  input_name = createInput("");
  input_name.position(cnvRect.x + width / 2 - 53, cnvRect.y + height / 2 + 40);
  input_name.size(100);
  input_name.elt.setAttribute("placeholder", "Input Your Name");
  input_name.elt.setAttribute("maxlength", "8");
  input_name.elt.style.backgroundColor = "black";
  input_name.elt.style.border = "1px solid rgb(0, 255, 0)";
  input_name.elt.style.color = "rgb(0, 255, 0)";
  input_name.elt.style.outlineColor = "rgb(0, 255, 0)";
  input_name.hide();
}
