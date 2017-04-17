class Break {
  toString() {
    return '(break)';
  }

  analyze(context) {
    context.assertInLoop();
  }

  get(context) {
    return this;
  }

}

module.exports = Break;
