class GreeterModule {
    constructor(message) {
      this.message = message;
    }

    greet() {
      alert(this.message);
    }
};

export default GreeterModule;