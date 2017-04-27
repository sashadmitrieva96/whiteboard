class Break {
  /* eslint class-methods-use-this: 0*/
  toString() {
    return '(break)';
  }

  analyze() {
    context.assertInLoop();
  }

  get() {
    return this;
  }

}

module.exports = Break;
