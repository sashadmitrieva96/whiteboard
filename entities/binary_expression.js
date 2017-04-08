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
    this.type = this.op.resultType();
    this.op.argumentType().assertTypeCompatability([this.left.type, this.right.type], [this.op, this.left.type, this.right.type]);
  }
}

module.exports = BinaryExpression;
