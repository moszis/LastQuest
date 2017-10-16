export default class Enemy {
    constructor(message) {
      this.message = message;
    }

    greet() {
      alert(this.message);
    }
};