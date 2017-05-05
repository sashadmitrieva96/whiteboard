class Break {
  /* eslint class-methods-use-this: 0*/
  constructor() {
    this.isBreak = true;
  }

  toString() {
    return '(break)';
  }

  analyze() {
    context.assertInLoop();
  }

  get() {
    return this;
  }

  optimize() {
    return this;
  }

}

module.exports = Break;
