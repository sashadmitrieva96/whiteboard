class WhileStatement {
  constructor(exp, block) {
    this.exp = exp;
    this.block = block;
  }

  toString() {
    return `(while ${this.exp.toString()} {${this.block.toString()}})`;
  }
}

module.exports = WhileStatement;
