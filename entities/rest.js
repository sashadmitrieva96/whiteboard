class Rest {
  constructor() {
    this.id = 'rest';
    this.arguments = [];
  }

  analyze(context) {
    this.arguments.forEach((a) => {
      a.analyze(context);
    });
  }

  addArgument(arg) {
    this.arguments.push(arg);
  }

  isEmpty() {
    return this.arguments.length === 0;
  }

  optimize() {
    this.arguments.optimize();
  }

}

module.exports = Rest;
