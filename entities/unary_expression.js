class UnaryExpression{
  constructor(op, exp) {
    this.op = op;
    this.exp = exp;
  }

  ToString(){
    return `(${this.op} ${this.exp})`;
  }
}

module.exports = UnaryExpression;
