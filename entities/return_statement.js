class ReturnStatement {
  constructor(exp) {
    this.exp = exp;
  }

  toString() {
    return `(Return -> ${this.exp.toString()})`;
  }

  analyze(context) {
    context.assertInFunction('Return statement is not in function');
  }
}

module.exports = ReturnStatement;
