# Space-Invaders

# Background

Space Invaders is a fixed shooter in which the player moves a laser cannon horizontally across the bottom of the screen and fires at aliens overhead. The aliens begin as five rows of eleven that move left and right as a group, shifting downward each time they reach a screen edge. The goal is to eliminate all of the aliens by shooting them. While the player has three lives, the game ends immediately if the invaders reach the bottom of the screen.The aliens attempt to destroy the player's cannon by firing projectiles. The laser cannon is partially protected by stationary defense bunkers which are gradually destroyed from the top by the aliens and, if the player fires when beneath one, the bottom gets destroyed.

# Features

This game will allow users to use the LEFT/RIGHT arrow keys on their keyboard to move their own ship. Users will also use the SPACE bar to shoot their laser to destroy the invader ships. In order to win a user must destroy all of the invaders without colliding with their ship or getting shot by the invader ships.
<br>
Added functionality to detect collisions between invader ship and player bullets and also allow ships to shoot lasers at user.

```javascript
// src/invader.js
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
```

<br>

Allow users to press LEFT or RIGHT on the keypad to move laterally and SPACE to shoot.

```javascript
// src/player.js
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
```

# Technologies

- Vanilla JS to create all the classes and instances for player, bullets, invaders, and their movements. Use of event listeners in order to open instructions pane and start the game.
- HTML/CSS to style the page and format elements.

# Interface

![Home Page](https://github.com/camachoo1/Space-Invaders/blob/main/assets/homepage.png)
![How To Play](https://github.com/camachoo1/Space-Invaders/blob/main/assets/howtoplay.png)
![Win](https://github.com/camachoo1/Space-Invaders/blob/main/assets/win.png)
![Game UI](https://github.com/camachoo1/Space-Invaders/blob/main/assets/game.png)

# Bonus

Looking to implement some bonus features and clean up some small bugs with rendering a winner screen. Some of those features include:

1. Adding 3 lives to the player.
2. Rendering a score and a high score that stays on the display.
3. Work on the win conditions because if the ships reach the bottom without the user getting hit or colliding with them the game will not end. (bug fix)
