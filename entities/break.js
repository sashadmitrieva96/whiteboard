class Break {
  toString() {
    return '(break)';
  }

  analyze(context) {
    if (!context.inLoop) {
      error();
    }
  }
}

module.exports = Break;
