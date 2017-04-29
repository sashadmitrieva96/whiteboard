class UnaryExpression {
  constructor(op, exp) {
    this.op = op;
    this.expression = exp;
  }

  toString() {
    return `(UnaryExpression ${this.op.toString()} :  ${this.expression.toString()})`;
  }

  analyze(context) {
    this.expression.analyze(context);
    this.op.analyze();
    this.op.compatibleWithArgument(this.expression.type);
    this.type = this.op.type;
  }

  get() {
    return this;
  }

}


module.exports = UnaryExpression;
