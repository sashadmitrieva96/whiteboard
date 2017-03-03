class BinaryExpression{
  constructor(left, exp, right){
    this.left = left;
    this.exp = exp;
    this.right = right;
  }

  ToString() {
    return `(${this.left} ${this.exp} ${this.right})`;
  }
}

module.exports = BinaryExpression;
