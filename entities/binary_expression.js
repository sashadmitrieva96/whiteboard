class BinaryExpression{
  constructor(left, op, right){
    this.left = left;
    this.op = op;
    this.right = right;
  }

  toString() {
    return `(${this.left.toString()} ${this.op.toString()} ${this.right.toString()})`;
  }
}

module.exports = BinaryExpression;
