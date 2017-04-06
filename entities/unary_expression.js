const Type = require('./type.js');

class UnaryExpression {
  constructor(op, exp) {
    this.op = op;
    this.exp = exp;

    this.booleanOps = ['!', 'not'];
    this.numberOps = ['-'];
  }

  toString() {
    return `(UnaryExpression ${this.op} :  ${this.exp.toString()})`;
  }

  getExpressionType() {
    if (this.booleanOps.includes(this.op)) {
      return Type.BOOL;
    } else if (this.numberOps.includes(this.op)) {
      return Type.NUM;
    }
    throw Error();
  }

  analyze(context) {
    this.type = this.getExpressionType();
    this.exp.analyze(context);
    if (!this.type.equals(this.exp.type)) {
      throw Error();
    }
  }
}


module.exports = UnaryExpression;
