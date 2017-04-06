const Type = require('./type.js');

class BinaryExpression {
  constructor(left, op, right) {
    this.left = left;
    this.op = op;
    this.right = right;

    this.booleanOps = ['>=', '>', '<=', '<', '!=', '=='];
    this.numberOps = ['+', '-', '*', '/', '%', 'mod', '**']; // ADD NUM OPS
  }

  toString() {
    return `(BinaryExpression (Left : ${this.left.toString()}) (Op : ${this.op.toString()}) (Right : ${this.right.toString()}))`;
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
    this.left.analyze(context);
    this.right.analyze(context);
    this.type = this.getExpressionType();
    if (!this.type.equal(this.left.type) || !this.type.equal(this.right.type)) {
      throw Error();
    }
  }
}

module.exports = BinaryExpression;
