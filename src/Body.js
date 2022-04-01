class Body {
  constructor(el) {
    const board = document.querySelector('#board');

    this.fullBody = [el];

    this.neck = document.createElement('div');
    this.neck.setAttribute('id', 'neck');
    this.neck.setAttribute('class', 'body');
    board.appendChild(this.neck);
    this.fullBody.push(this.neck);

    this.tail = this.fullBody[this.fullBody.length - 1];

    // this.append();
  }

  append() {
    this.node = document.createElement('div');
    this.node.setAttribute('class', 'body');

    board.appendChild(this.node);

    const tailPosition = this.tail.getAttribute('style');
    this.node.setAttribute('style', tailPosition);

    this.fullBody.push(this.node);
    this.tail = this.fullBody[this.fullBody.length - 1];
  //   if (this.fullBody.length === 2) {
  //     this.node.setAttribute('id', 'neck');
  //     this.append();
  //  }
  }
}