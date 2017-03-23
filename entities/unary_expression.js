class UnaryExpression{
  constructor(op, exp) {
    this.op = op;
    this.exp = exp;
  }

  toString(){
    return `(UnaryExpression ${this.op} :  ${this.exp.toString()})`;
  }
}

module.exports = UnaryExpression;
