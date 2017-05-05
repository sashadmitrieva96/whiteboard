const BoolLit = require('./bool_lit.js');
const NumLit = require('./num_lit.js');

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

    this.type = this.op.resultType()[0];
  }

  get() {
    return this;
  }

  optimize() {
    this.expression = this.expression.optimize();
    this.op = this.op.optimize();
    if (this.op.op === 'not' && this.expression instanceof BoolLit) {
      return this.expression.opposite();
    } else if (this.op.op === '-' && this.expression instanceof NumLit) {
      return new NumLit(-this.expression.value);
    }
    return this;
  }

}


module.exports = UnaryExpression;
