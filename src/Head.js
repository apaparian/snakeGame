class Head {
  constructor(el) {
    this.node = document.createElement('div');
    this.node.setAttribute('id', 'head');
    el.appendChild(this.node);

    this.currentDirection = null;
    this.SPEED = 250;

    this.node.style.top = 0;
    this.node.style.left = 0;

    this.startBody = new Body(this.node);

    this.dead = false;

    setTimeout(this.move.bind(this), this.SPEED);
  }

  move() {
    const head = this.node;
    const body = this.startBody;
    const direction = this.currentDirection;

    let topPosition = Number(head.style.top.replace('px', ''));
    let leftPosition = Number(head.style.left.replace('px', ''));

    // while(topPosition <= 700 && topPosition >=0 && topPosition <= 700 && topPosition >=0){
    if (direction === 'right') {
      head.style.left = `${(leftPosition += 50)}px`;
    }
    if (direction === 'down'){
      head.style.top =`${(topPosition += 50)}px`;
    }
    if(direction === 'left'){
      head.style.left =`${(leftPosition -= 50)}px`;
    }
    if(direction === 'up'){
      head.style.top =`${(topPosition -= 50)}px`;
    }

    // // Game Over condition below
    // const deletedApple = document.querySelector('#apple');
    // if (leftPosition >= 700 || leftPosition < 0 || topPosition >= 700 || topPosition < 0) {
    //   console.log('Game Over')
    //   head.remove();
    //   deletedApple.remove()

    //   const board = document.querySelector('#board');
    //   const gameOver = document.createElement('img');

    //   gameOver.setAttribute('id', 'game-over');
    //   gameOver.setAttribute('src', 'src/assets/gameOver.png');
    //   board.appendChild(gameOver);
    //   gameOver.style.top = '250px';
    //   gameOver.style.left = '125px';

    //   return;
    // }

    // // shift body

    // for (let i = body.fullBody.length - 1; i > 0; i -= 1) {
    //   body.fullBody[i].setAttribute('style', body.fullBody[i - 1].getAttribute('style'));
    // }
    // body.fullBody[0].setAttribute('style', head.getAttribute('style'));


    // // Eat apple / delete apple sequence
    // if (this.node.getAttribute('style') === deletedApple.getAttribute('style')) {
    //   // deletedApple = document.querySelector('#apple');
    //   console.log('delete apple');
    //   deletedApple.remove();
    //   const apple = new Apple(board);

    //   body.append();
    // }
    if (!this.dead) setTimeout(this.move.bind(this), this.SPEED);
  }
}
