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
    this.left.analyze(context);
    this.right.analyze(context);
  }
}

module.exports = BinaryExpression;
