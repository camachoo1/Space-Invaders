export class Bullet {
  constructor(canvas, x, y, vel, color) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.vel = vel;
    this.color = color;

    this.width = 5;
    this.height = 20;
  }

  draw(ctx) {
    this.y -= this.vel;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
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

export class BulletsController {
  bullets = [];
  timeTilNextBulletAllowed = 0;

  constructor(canvas, maxBullets, color) {
    this.canvas = canvas;
    this.maxBullets = maxBullets;
    this.color = color;
  }

  draw(ctx) {
    this.bullets = this.bullets.filter(
      (bullet) =>
        bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height
    );

    this.bullets.forEach((bullet) => bullet.draw(ctx));

    if (this.timeTilNextBulletAllowed > 0)
      this.timeTilNextBulletAllowed--;
  }

  detectCollision(sprite) {
    const bulletCollisionIdx = this.bullets.findIndex((bullet) =>
      bullet.detectCollision(sprite)
    );

    if (bulletCollisionIdx >= 0) {
      this.bullets.splice(bulletCollisionIdx, 1);
      return true;
    }
    return false;
  }

  shoot(x, y, vel, timeTilNextBulletAllowed = 0) {
    if (
      this.timeTilNextBulletAllowed <= 0 &&
      this.bullets.length < this.maxBullets
    ) {
      const bullet = new Bullet(this.canvas, x, y, vel, this.color);
      this.bullets.push(bullet);
      this.timeTilNextBulletAllowed = timeTilNextBulletAllowed;
    }
  }
}
