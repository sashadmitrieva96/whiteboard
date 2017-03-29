class WhileStatement {
  constructor(exp, block) {
    this.exp = exp;
    this.block = block;
  }

  toString() {
    return `(while ${this.exp.toString()} {${this.block.toString()}})`;
  }

  analyze() {
    this.condition.analyze();
    if (this.condition.type != type.bool) {
      error();
    }
  }
}

module.exports = WhileStatement;
