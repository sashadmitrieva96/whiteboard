const Type = require('./type.js');

class BinaryExpression {
  constructor(left, op, right) {
    this.left = left;
    this.op = op;
    this.right = right;
  }

  toString() {
    return `(BinaryExpression (Left : ${this.left.toString()}) (Op : ${this.op.toString()}) (Right : ${this.right.toString()}))`;
  }

  analyze(context) {
    // console.log(this.op.resultType());
    this.left.analyze(context);
    this.right.analyze(context);
    this.type = this.op.resultType();
    // console.log(`l: ${this.left.type}  op:(${this.op}) ${this.type}  r: ${this.right.type}`);
    this.op.argumentType().assertTypeCompatability([this.left.type, this.right.type]);
  }
}

module.exports = BinaryExpression;
