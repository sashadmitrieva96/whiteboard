class ReturnStatement {
  constructor(exp) {
    this.expression = exp;
  }

  toString() {
    return `(Return -> ${this.exp.toString()})`;
  }

  analyze(context) {
    context.assertInFunction();
    if (this.expression) {
      this.expression.analyze(context);
      this.type = this.expression.type;
      context.type = this.type;
    }
  }

  get(context) {
    return this;
  }

}

module.exports = ReturnStatement;
