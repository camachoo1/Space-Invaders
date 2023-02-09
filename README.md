# Space-Invaders

# Background

Space Invaders is a fixed shooter in which the player moves a laser cannon horizontally across the bottom of the screen and fires at aliens overhead. The aliens begin as five rows of eleven that move left and right as a group, shifting downward each time they reach a screen edge. The goal is to eliminate all of the aliens by shooting them. While the player has three lives, the game ends immediately if the invaders reach the bottom of the screen.The aliens attempt to destroy the player's cannon by firing projectiles. The laser cannon is partially protected by stationary defense bunkers which are gradually destroyed from the top by the aliens and, if the player fires when beneath one, the bottom gets destroyed.

# Functionality

This game will allow users to use the LEFT/RIGHT arrow keys on their keyboard to move their own ship. Users will also use the SPACE bar to shoot their laser to destroy the invader ships. In order to win a user must destroy all of the invaders without colliding with their ship or getting shot by the invader ships.

# Technologies

- Vanilla JS to create all the classes and instances for player, bullets, invaders, and their movements. Use of event listeners in order to open instructions pane and start the game.
- HTML/CSS to style the page and format elements.

# Implementation

1. Set up project, get webpack up and running, and create nav bar with event listeners attached for pop ups and game rendering.
2. Create classes for Player, Invaders, and Bullets.
3. Create the controllers for the Player, Invaders, Bullets that will control the movements and firing of all the lasers.
4. Once core functionality is completed work on styling the page and adding a background.

# Bonus

Looking to implement some bonus features and clean up some small bugs with rendering a winner screen. Some of those features include:

1. Adding 3 lives to the player.
2. Rendering a score and a high score that stays on the display.
3. Work on the win conditions because if the ships reach the bottom without the user getting hit or colliding with them the game will not end. (bug fix)
