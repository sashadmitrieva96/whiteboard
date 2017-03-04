class ReturnStatement {
  constructor(exp) {
    this.exp = exp;
  }

  toString() {
    return `(Return -> ${this.exp.toString()})`;
  }
}

module.exports = ReturnStatement;
