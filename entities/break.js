class Break {
  toString() {
    return '(break)';
  }

  analyze(context) {
    context.assertInLoop('break statement not in loop');
  }
}

module.exports = Break;
