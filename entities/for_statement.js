class ForStatement {
  constructor(id, exp, block) {
    this.id = id;
    this.expression = exp;
    this.block = block;
  }

  toString() {
    return `(for ${this.id} in ${this.exp.toString()} {${this.block.toString()}})`;
  }

  analyze(context) {
    this.closure = context.createChildContextForLoop();
    this.expression.analyze(this.closure);
    this.closure.addVariable(this.id, this.expression);
    this.block.analyze(this.closure);
  }

  get() {
    return this;
  }


}

module.exports = ForStatement;
