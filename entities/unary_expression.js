class UnaryExpression {
  constructor(op, exp) {
    this.op = op;
    this.exp = exp;
  }

  toString() {
    return `(UnaryExpression ${this.op.toString()} :  ${this.exp.toString()})`;
  }

  analyze(context) {
    this.type = this.op.resultType();
    this.exp.analyze(context);
    this.op.argumentType().assertTypeCompatability([this.exp.type]);
  }
}


module.exports = UnaryExpression;
