class ReturnStatement {
  constructor(exp) {
    this.exp = exp;
  }

  toString() {
    return `(Return ${exp})`;
  }
}

module.exports = ReturnStatement;
