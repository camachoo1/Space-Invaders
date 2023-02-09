import { InvadersController } from './invader.js';
import Player from './player.js';
import { BulletsController } from './bullet.js';

document.addEventListener('DOMContentLoaded', () => {});

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// canvas.width = 700;
// canvas.height = 700;

const background = new Image();
background.src = 'assets/images/space.png';

const playerBulletController = new BulletsController(
  canvas,
  10,
  'red'
);
const invaderBulletController = new BulletsController(
  canvas,
  5,
  'blue'
);

const invaderController = new InvadersController(
  canvas,
  invaderBulletController,
  playerBulletController
);

const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let win = false;

const game = function () {
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  displayGameOver();

  if (!isGameOver) {
    invaderController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    invaderBulletController.draw(ctx);
  }
};

const checkGameOver = function () {
  if (isGameOver) {
    return;
  }

  if (invaderBulletController.detectCollision(player))
    isGameOver = true;

  if (invaderController.collideWith(player)) isGameOver = true;

  if (invaderController.invadersRows.length === 0) {
    win = true;
    isGameOver = true;
  }
};

const displayGameOver = function () {
  if (isGameOver) {
    let text = win ? 'You Win' : 'Game Over';
    let textOffset = win ? 3 : 5;

    ctx.fillStyle = 'white';
    ctx.font = '70px Space Invaders';
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
  }
};

// Element
const startGame = document.querySelector('.start-game');

// const start = function () {
//   setInterval(game, 1000 / 60);
// };
// startGame.addEventListener('click', start);
setInterval(game, 1000 / 60);
