class ReturnStatement {
  constructor(exp) {
    this.exp = exp;
  }

  toString() {
    return `(Return ${this.exp})`;
  }
}

module.exports = ReturnStatement;
