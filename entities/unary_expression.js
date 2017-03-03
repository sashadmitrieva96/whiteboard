class UnaryExpression{
  constructor(op, exp) {
    this.op = op;
    this.exp = exp;
  }

  toString(){
    return `(${this.op} ${this.exp})`;
  }
}

module.exports = UnaryExpression;
