class Player {
  rightPress = false;
  leftPress = false;
  shootPress = false;

  constructor(canvas, vel, bulletsController) {
    this.canvas = canvas;
    this.vel = vel;
    this.bulletsController = bulletsController;

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 50;
    this.width = 50;
    this.height = 50;
    this.image = new Image();
    this.image.src = 'assets/images/player.png';

    document.addEventListener('keydown', this.keydown);
    document.addEventListener('keyup', this.keyup);
  }

  move() {
    if (this.leftPress) this.x -= this.vel;
    if (this.rightPress) this.x += this.vel;
  }

  draw(ctx) {
    if (this.shootPress) {
      this.bulletsController.shoot(
        this.x + this.width / 2,
        this.y,
        4,
        10
      );
    }
    this.move();
    this.wallCollision();
    ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  wallCollision() {
    if (this.x < 0) this.x = 0;
    if (this.x > this.canvas.width - this.width)
      this.x = this.canvas.width - this.width;
  }

  keydown = (e) => {
    if (e.code === 'ArrowRight') this.rightPress = true;

    if (e.code === 'ArrowLeft') this.leftPress = true;

    if (e.code === 'Space') this.shootPress = true;
  };

  keyup = (e) => {
    if (e.code === 'ArrowRight') this.rightPress = false;

    if (e.code === 'ArrowLeft') this.leftPress = false;

    if (e.code === 'Space') this.shootPress = false;
  };
}

export default Player;
