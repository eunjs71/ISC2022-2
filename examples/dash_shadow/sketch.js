let img_finn_with_jake;
let img_finn_without_jake;
let img_big_jake;

function preload() {
  img_finn_with_jake = loadImage("image/finn_with_jake.png"); // 97 * 95
  img_finn_without_jake = loadImage("image/finn_without_jake.png"); // 97 * 95
  img_big_jake = loadImage("image/big_jake.png"); // 400 * 300
}

let jakeFinn = true;
let jake;
let small_jake_coords = [50, 480, 50, 62];
let big_jake_coords = [150, 150, 400, 300];
let small_jake_info = { x: 50, y: 480, w: 50, h: 62 };
let big_jake_info = { x: 150, y: 150, w: 400, h: 300 };

function setup() {
  createCanvas(600, 600);

  jake = new Jake(
    small_jake_info,
    big_jake_info,
    img_big_jake,
    200, // speed
    10 //dim
  );

  textAlign(LEFT, BOTTOM);
}

function draw() {
  fill(220);
  stroke(0);
  rect(0, 0, width, height);

  fill(0);
  text("키를 눌러 효과를 확인하세요.", 20, 20);

  if (jake.mode == "SMALL") {
    image(img_finn_with_jake, 50, 450);
  } else {
    image(img_finn_without_jake, 50, 450);
  }

  jake.move();
  jake.draw();

  if (jake.mode == "BIG") {
    image(img_big_jake, 150, 150);
  }

  stroke(255, 0, 0);
  noFill();

  rect(...small_jake_coords);
  rect(...big_jake_coords);

  fill(255, 0, 0);
  text(`(${small_jake_coords})`, small_jake_coords[0], small_jake_coords[1]);
  fill(255, 0, 0);
  text(`(${big_jake_coords})`, big_jake_coords[0], big_jake_coords[1]);
}

function keyPressed() {
  jake.formChange();
}
function mousePressed() {
  jake.formChange();
}

class Jake {
  constructor(small, big, big_img, speed, dim) {
    this.small = small;
    this.big = big;
    this.big_img = big_img;
    this.speed = speed;
    this.dim = dim;
    this.mode = "SMALL";
    this.shadows = [];
    this.endCount = 1000;
    this.currCount = 0;
  }

  move() {
    if (this.mode == "GET_BIGGER") {
      let shadowCoord = {
        x: map(this.currCount, 0, this.endCount, this.small.x, this.big.x),
        y: map(this.currCount, 0, this.endCount, this.small.y, this.big.y),
        w: map(this.currCount, 0, this.endCount, this.small.w, this.big.w),
        h: map(this.currCount, 0, this.endCount, this.small.h, this.big.h),
      };

      this.shadows.push(
        new Shadow(shadowCoord, this.big_img, this.speed, this.dim)
      );

      this.currCount += this.speed;
      if (this.currCount >= this.endCount) {
        this.mode = "BIG";
        this.currCount = 0;
      }
    }

    if (this.mode == "GET_SMALLER") {
      this.currCount += this.speed;
      let shadowCoord = {
        x: map(this.currCount, 0, this.endCount, this.big.x, this.small.x),
        y: map(this.currCount, 0, this.endCount, this.big.y, this.small.y),
        w: map(this.currCount, 0, this.endCount, this.big.w, this.small.w),
        h: map(this.currCount, 0, this.endCount, this.big.h, this.small.h),
      };

      this.shadows.push(
        new Shadow(shadowCoord, this.big_img, this.speed, this.dim)
      );

      this.currCount += this.speed;
      if (this.currCount >= this.endCount) {
        this.mode = "SMALL";
        this.currCount = 0;
      }
    }
    this.shadows.forEach((shadow) => {
      shadow.dimmer();
    });
    this.updateShadow();
  }

  draw() {
    this.shadows.forEach((shadow) => {
      shadow.draw();
    });
  }

  updateShadow() {
    if (this.shadows.length > 0) {
      if (this.shadows[0].alpha < 0) {
        this.shadows.shift();
      }
    }
  }

  formChange() {
    if (this.mode == "SMALL") {
      this.mode = "GET_BIGGER";
    }
    if (this.mode == "BIG") {
      this.mode = "GET_SMALLER";
    }
  }
}

class Shadow {
  constructor(coord, img, speed, dim) {
    this.x = coord.x;
    this.y = coord.y;
    this.w = coord.w;
    this.h = coord.h;
    this.img = img;
    this.alpha = 255;
    this.speed = speed;
    this.dim = dim;
    this.disappered = false;
  }

  dimmer() {
    if (!this.disappered) {
      this.currCount += this.speed;
      if (this.alpha < 0) {
        this.disappered = true;
      }
    }
    this.fadeout();
  }

  draw() {
    if (!this.disappered) {
      tint(255, this.alpha);
      image(this.img, this.x, this.y, this.w, this.h);
      noTint();
    }
  }

  fadeout() {
    this.alpha -= this.dim;
  }
}
