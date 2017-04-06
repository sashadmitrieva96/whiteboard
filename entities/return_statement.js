class ReturnStatement {
  constructor(exp) {
    this.exp = exp;
  }

  toString() {
    return `(Return -> ${this.exp.toString()})`;
  }

  analyze(context) {
    context.assertInFunction('Return statement is not in function');
    this.exp.analyze(context);
    if (!context.type.equals(this.exp.type)) {
      throw Error('return type doesnt match function type');
    }
  }
}

module.exports = ReturnStatement;
