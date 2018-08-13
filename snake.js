window.onload = function() {
  const cvs = document.getElementById('canvas');
  const ctx = cvs.getContext('2d');

  const cvsWidth = cvs.width;
  const cvsHeight = cvs.height;

  const snakeWidth = 10;
  const snakeHeight = 10;

  let score = 0;
  // default direction of snake
  let direction = 'down';

  document.addEventListener('keydown', listenForKeyCode);

  function listenForKeyCode(e) {
    if(e.keyCode == 37 && direction != 'right') {
      direction = 'left';
    } else if(e.keyCode == 38 && direction != 'down') {
      direction = 'up';
    } else if(e.keyCode == 39 && direction != 'left') {
      direction = 'right';
    } else if(e.keyCode == 40 && direction != 'up') {
      direction = 'down';
    }
  }

  let snake = [];

  buildSnake(snake);

  spawnFoodPosition();

  function triggerGame(){
    clearCanvas();    
    animateSnake();
    drawFood(food.x, food.y);

    // snake head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // directs snake based on keycode
    if (direction == 'left') {
        snakeX--;
      } else if (direction == 'up') {
        snakeY--;
      } else if (direction == 'right') {
        snakeX++;
      } else if (direction == 'down') {
        snakeY++;
    }

    isSnakeHittingWallOrSelf(snakeX, snakeY, snake);

    newHead = isSnakeEatingFood(snakeX, snakeY, food);
    
    // puts in new head of snake
    snake.unshift(newHead);

    drawScore(score);
  }

  function drawScore(x) {
    ctx.fillStyle = 'white';
    ctx.font = '12px Helvetica';
    ctx.fillText('SCORE: ' + x, 5, 15);
  }

  function isSnakeEatingFood(snakeX, snakeY, food) {
    if(snakeX == food.x && snakeY == food.y){
      spawnFoodPosition();
      score++;
  
      return newHead = {
        x : snakeX,
        y : snakeY
      }
    } else {
        snake.pop();
        return newHead = {
            x : snakeX,
            y : snakeY
        }
    }
  }

  function clearCanvas() {
    ctx.clearRect(0,0, cvsWidth, cvsHeight);
  }

  function snakeBodyCollision(x, y, array) {
    for(let i = 0; i < array.length; i++){
        if(x == array[i].x && y == array[i].y){
          return true;
        }
    }
    return false;
  }

  function isSnakeHittingWallOrSelf(snakeX, snakeY, snake) {
    if (snakeX < 0 || snakeY < 0 || snakeX >= cvsWidth / snakeWidth || snakeY >= cvsHeight / snakeHeight || snakeBodyCollision(snakeX, snakeY, snake)) {
      location.reload();
    }
  }

  function buildSnake(snake){
    const snakeLength = 3;
    for (let i = snakeLength - 1; i >= 0; i--) {
      snake.push({
        x: i, 
        y: 0
      });
    }
  }

  function drawSnake(xPosition, yPosition) {
    ctx.fillStyle = '#2980b9';
    ctx.fillRect(xPosition * snakeWidth, yPosition * snakeHeight, snakeWidth, snakeHeight);

    ctx.fillStyle = 'black'
    ctx.strokeRect(xPosition * snakeWidth, yPosition * snakeHeight, snakeWidth, snakeHeight);
  }

  function spawnFoodPosition() {
    food = {
      x: Math.round(Math.random() * (cvsWidth/snakeWidth-2)+1),
      y: Math.round(Math.random() * (cvsHeight/snakeHeight-2)+1)
    }
  }

  function drawFood(xPosition, yPosition){
    ctx.fillStyle = '#9b59b6';
    ctx.fillRect(xPosition * snakeWidth, yPosition * snakeHeight, snakeWidth, snakeHeight);

    ctx.fillStyle = 'black'
    ctx.strokeRect(xPosition * snakeWidth, yPosition * snakeHeight, snakeWidth, snakeHeight);
  }

  function animateSnake() {
    for (let i = 0; i < snake.length; i++) {
      let x = snake[i].x;
      let y = snake[i].y;
      drawSnake(x,y);
    }
  }

  setInterval(triggerGame, 100);
};