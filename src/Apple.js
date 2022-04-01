class Apple {
  constructor(el) {
    this.node = document.createElement('img');
    this.node.setAttribute('id', 'apple');
    this.node.setAttribute('src', 'src/assets/apple.png');

    el.appendChild(this.node);

    this.node.style.top = `${((Math.floor(Math.random() * (14 - 1) + 1) * 50) - 50)}px`;
    this.node.style.left = `${((Math.floor(Math.random() * (14 - 1) + 1) * 50) - 50)}px`;
  }


}
