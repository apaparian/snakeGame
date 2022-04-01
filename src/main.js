document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const board = document.querySelector('#board');

  const boardTexture = document.createElement('img');
  boardTexture.setAttribute('src', 'src/assets/background.png');
  boardTexture.setAttribute('id', 'board-texture');
  board.append(boardTexture);

  const head = new Head(board);
  const snakeBody = new Body(head.node);
  new Apple(board);

  let topPosition, leftPosition;

  head.node.setAttribute('class', 'head-right');

  const intro = new Audio('src/assets/arcadeOpen.wav');
  const bgMusic = new Audio('src/assets/bgMusic.mp3');

  let playIntroOnce = true;
  body.addEventListener('keydown', () => {
    if (playIntroOnce) {
      intro.play();
      bgMusic.play();
      bgMusic.loop = true;
      playIntroOnce = false;
    }
  });

  body.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
      console.log('pressed left');
      if (head.currentDirection !== 'right') {
        head.currentDirection = 'left';
        head.node.setAttribute('class', 'head-left');
      }
    }
  });
  body.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowUp') {
      console.log('pressed up');
      if (head.currentDirection !== 'down') {
        head.currentDirection = 'up';
        head.node.setAttribute('class', 'head-up');
      }
    }
  });
  body.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') {
      console.log('pressed right');
      if (head.currentDirection !== 'left') {
        head.currentDirection = 'right';
        head.node.setAttribute('class', 'head-right');
      }
    }
  });
  body.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowDown') {
      console.log('pressed down');
      if (head.currentDirection !== 'up') {
        head.currentDirection = 'down';
        head.node.setAttribute('class', 'head-down');
      }
    }
  });

  const hitBody = () => {
    const headPosition = snakeBody.fullBody[0].getAttribute('style');

    for (let i = 2; i <= snakeBody.fullBody.length - 1; i += 1) {
      const segmentPosition = snakeBody.fullBody[i].getAttribute('style');

      if (headPosition === segmentPosition) {
        return true;
      }
    }
  }
  const hitBoundary = () => {
    topPosition = Number(head.node.style.top.replace('px', ''));
    leftPosition = Number(head.node.style.left.replace('px', ''));
    if (leftPosition >= 700 || leftPosition < 0 || topPosition >= 700 || topPosition < 0) {
      return true;
    } else {
      return false;
    }
  }
  const isGameOver = () => {
    // Game Over condition below
    const deletedApple = document.querySelector('#apple');
    // helper functions for lose conditions
    if (hitBoundary() || hitBody()) {

      // snakeBody.neck.setAttribute('class', head.node.getAttribute('class'));
      snakeBody.neck.setAttribute('id', 'dead-head');

      // if (head.currentDirection === 'right') snakeBody.neck.setAttribute('class', '.head-right .body');
      // if (head.currentDirection === 'down') snakeBody.neck.setAttribute('class', 'head-down');
      // if (head.currentDirection === 'left') snakeBody.neck.setAttribute('class', '.head-left .body');
      // if (head.currentDirection === 'up') snakeBody.neck.setAttribute('class', '.head-up .body');

      head.node.remove();
      deletedApple.remove();

      const deadBody = document.querySelectorAll('.body');
      deadBody.forEach((el) => { el.setAttribute('class', 'dead-body') });

      const gameOver = document.createElement('img');

      gameOver.setAttribute('id', 'game-over');
      gameOver.setAttribute('src', 'src/assets/gameOver.png');
      board.appendChild(gameOver);
      gameOver.style.top = '250px';
      gameOver.style.left = '140px';

      const deathSound = new Audio('src/assets/deadSound.mp3');
      bgMusic.pause();
      deathSound.play();

      console.log('Game Over');
      return true;
    }
  }

  const followBody = () => {
    for (let i = snakeBody.fullBody.length - 1; i > 0; i -= 1) {
      snakeBody.fullBody[i].setAttribute('style', snakeBody.fullBody[i - 1].getAttribute('style'));
    }
    // snakeBody.fullBody[0].setAttribute('style', head.node.getAttribute('style'));
  }

  const eatApple = () => {
    const deletedApple = document.querySelector('#apple');
    // Eat apple / delete apple sequence
    if (head.node.getAttribute('style') === deletedApple.getAttribute('style')) {
      // deletedApple = document.querySelector('#apple');
      console.log('delete apple');
      deletedApple.remove();

      let onBody = true;
      while (onBody) {
        onBody = false;
        const apple = new Apple(board);
        const checkBody = document.querySelectorAll('.body');

        checkBody.forEach ( (el) => {
          if (el.getAttribute('style') === apple.node.getAttribute('style')) onBody = true;
        });
        if (onBody) {
          apple.node.remove();
        }
      }
      snakeBody.append();
      followBody;
    }
  }

  const loop = () => {
    if (isGameOver()) return;
    // shift body

    followBody();
    eatApple();

    setTimeout(loop, head.SPEED);
  }
  setTimeout(loop, head.SPEED);

});
