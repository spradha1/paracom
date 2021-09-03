# Paracom

  Play the game of [Paracom](https://paracom-bd46a.web.app/). This is just an attempt to replicate a simple game I remember playing in a Windows computer in the '90s. I still can't remember the exact name of it.

## Installation

  Download the project and open the 'public/index.html' file in your favorite browser, keeping the contents of the 'public' directory the same.

## Gameplay

  The bricks are randomized every game according to the size of the viewport. You can either drag the paddle or use arrow keys to control the paddle. Destroy all the bricks to win!

## Tech stack

  This project required nothing but HTML, CSS, and plain JavaScript.

## Deployment

  I used Google's [Firebase Hosting](https://firebase.google.com/docs/hosting/quickstart) service to deploy the [game](https://paracom-bd46a.web.app/).

## Future Developments & call for contributions

  Currently the grid size is 780px x 500px. So, I suggest running it on suitable screen size. I could give smaller measurements to the elements for a mobile device accordingly. However, if the browser window is resized midway, I have to adjust the brick widths. Thus, it forces me to rerender all the bricks every time that happens and I feel that is inefficient. If you have a better suggestion for making this responsive, I would love to check out your pull request and credit you if I incorporate your solution.
  
  Also, I will add some special bricks later on that modify the paddle length or the speed of the ball to make the game interesting. Or new levels! Or tell me what to do!
