class ReturnStatement {
  constructor(exp) {
    this.expression = exp;
  }

  toString() {
    return `(Return -> ${this.exp.toString()})`;
  }
/* eslint no-param-reassign: 0*/
  analyze(context) {
    context.assertInFunction();
    if (this.expression) {
      this.expression.analyze(context);
      this.type = this.expression.type;
      context.type = this.type;
    }
  }

  get() {
    return this;
  }

}

module.exports = ReturnStatement;
