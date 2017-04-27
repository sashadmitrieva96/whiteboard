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
    this.op.analyze();
    this.left.analyze(context);
    this.right.analyze(context);

    this.left.type.assertTypeCompatability(this.right.type);
    this.op.argumentType.assertTypeCompatability(this.left.type);
    this.op.argumentType.assertTypeCompatability(this.right.type);

    this.type = this.op.getBinaryType(this.left.type, this.right.type);
  }

  get() {
    return this;
  }


}

module.exports = BinaryExpression;
