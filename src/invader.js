import MovingDirs from './movingdirs.js';

export class Invader {
  constructor(x, y, imageNum) {
    this.x = x;
    this.y = y;
    this.width = 45;
    this.height = 30;

    this.image = new Image();
    this.image.src = `assets/images/enemy${imageNum}.png`;
  }

  move(xVel, yVel) {
    this.x += xVel;
    this.y += yVel;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  detectCollision(sprite) {
    if (
      this.x + this.width > sprite.x &&
      this.x < sprite.x + sprite.width &&
      this.y + this.height > sprite.y &&
      this.y < sprite.y + sprite.height
    ) {
      return true;
    } else {
      return false;
    }
  }
}

export class InvadersController {
  invadersMap = [
    [2, 3, 3, 3, 3, 2],
    [2, 1, 1, 1, 1, 2],
    [2, 3, 3, 3, 3, 2],
    [2, 1, 1, 1, 1, 2],
  ];

  invadersRows = [];

  curDir = MovingDirs.right;
  xVel = 0;
  yVel = 0;
  defaultXVel = 1;
  defaultYVel = 1;
  defaultMoveTimer = 30;
  moveTimer = this.defaultMoveTimer;
  fireBulletTime = 100;
  bulletTimer = this.fireBulletTime;

  constructor(
    canvas,
    invadersBulletsController,
    playerBulletsController
  ) {
    this.canvas = canvas;
    this.invadersBulletsController = invadersBulletsController;
    this.playerBulletsController = playerBulletsController;

    this.createInvaders();
  }

  draw(ctx) {
    this.decrementMoveTimer();
    this.updateVelAndDirs();
    this.detectCollision();
    this.drawInvaders(ctx);
    this.resetMoveDownTimer();
    this.fire();
  }

  drawInvaders(ctx) {
    this.invadersRows.flat().forEach((invader) => {
      invader.move(this.xVel, this.yVel);
      invader.draw(ctx);
    });
  }

  detectCollision() {
    this.invadersRows.forEach((invaderRow) => {
      invaderRow.forEach((invader, idx) => {
        if (this.playerBulletsController.detectCollision(invader)) {
          invaderRow.splice(idx, 1);
        }
      });
    });
    this.invadersRows = this.invadersRows.filter(
      (invaderRow) => invaderRow.length > 0
    );
  }

  fire() {
    this.bulletTimer--;
    if (this.bulletTimer <= 0) {
      this.bulletTimer = this.fireBulletTime;
      const allInvaders = this.invadersRows.flat();
      const invaderIdx = Math.floor(
        Math.random() * allInvaders.length
      );
      const invader = allInvaders[invaderIdx];
      this.invadersBulletsController.shoot(
        invader.x + invader.width / 2,
        invader.y,
        -3
      );
    }
  }

  resetMoveDownTimer() {
    if (this.moveTimer <= 0) this.moveTimer = this.defaultMoveTimer;
  }

  decrementMoveTimer() {
    if (
      this.curDir === MovingDirs.downLeft ||
      this.curDir === MovingDirs.downRight
    ) {
      this.moveTimer--;
    }
  }

  updateVelAndDirs() {
    for (const invaderRow of this.invadersRows) {
      if (this.curDir === MovingDirs.right) {
        this.xVel = this.defaultXVel;
        this.yVel = 0;
        const lastInvader = invaderRow[invaderRow.length - 1];
        if (lastInvader.x + lastInvader.width >= this.canvas.width) {
          this.curDir = MovingDirs.downLeft;
          break;
        }
      } else if (this.curDir === MovingDirs.downLeft) {
        if (this.moveDown(MovingDirs.left)) {
          break;
        }
      } else if (this.curDir === MovingDirs.left) {
        this.xVel = -this.defaultXVel;
        this.yVel = 0;
        const firstInvader = invaderRow[0];
        if (firstInvader.x <= 0) {
          this.curDir = MovingDirs.downRight;
          break;
        }
      } else if (this.curDir === MovingDirs.downRight) {
        if (this.moveDown(MovingDirs.right)) {
          break;
        }
      }
    }
  }

  moveDown(newDir) {
    this.xVel = 0;
    this.yVel = this.defaultYVel;
    if (this.moveTimer <= 0) {
      this.curDir = newDir;
      return true;
    }
    return false;
  }

  createInvaders() {
    this.invadersMap.forEach((row, idx) => {
      this.invadersRows[idx] = [];
      row.forEach((invaderNum, invaderIdx) => {
        if (invaderNum > 0) {
          this.invadersRows[idx].push(
            new Invader(invaderIdx * 50, idx * 35, invaderNum)
          );
        }
      });
    });
  }

  collideWith(sprite) {
    return this.invadersRows
      .flat()
      .some((invader) => invader.detectCollision(sprite));
  }
}
