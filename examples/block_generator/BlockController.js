class BlockController {
  constructor() {
    this.blocks = [];
    this.blockSpeed = 1;
    this.blockW = 50;
    this.blockH = 50;
    this.genCount = 0;
    this.pLava = false;
  }

  moveBlocks() {
    if (this.genCount <= 0) {
      this.genCount = this.blockW;
      this.createBlocks();
      this.updateBlocks();
    }
    this.genCount -= this.blockSpeed;
    for (let block of this.blocks) {
      block.move();
    }
  }

  drawBlocks() {
    for (let block of this.blocks) {
      block.draw();
    }
  }

  createBlocks() {
    if (this.pLava) {
      this.pLava = false;
      return;
    }
    this.randomCreateBlock();
  }

  randomCreateBlock() {
    let r = parseInt(random(5));
    this.pLava = false;
    if (r == 0) {
      return;
    }
    if (r == 1) {
      this.createStone();
      return;
    }
    if (r == 2) {
      this.createBullet();
      return;
    }
    if (r == 3) {
      this.createLava();
      this.pLava = true;
      return;
    }
    if (r == 4) {
      this.createBullet();
      this.createLava();
      this.pLava = true;
      return;
    }
  }

  createStone() {
    this.blocks.push(new Stone(this.blockW, this.blockH, this.blockSpeed));
  }

  createBullet() {
    this.blocks.push(new Bullet(this.blockW, this.blockH, this.blockSpeed));
  }

  createLava() {
    this.blocks.push(new Lava(this.blockW, this.blockH, this.blockSpeed));
  }

  updateBlocks() {
    for (let i = 0; i < 2; i++) {
      if (this.blocks.length > 0) {
        let firstBlock = this.blocks[0];
        if (firstBlock.x < -this.blockW) {
          this.blocks.shift();
        }
      }
    }
  }

  resetPBlockInfo() {
    this.pStone = false;
    this.pBullet = false;
    this.pLava = false;
    this.pCount = 0;
  }
}
