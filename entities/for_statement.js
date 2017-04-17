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
    let blockContext = context.createChildContextForLoop();
    this.expression.analyze(blockContext);
    blockContext.addVariable(this.id, this.expression);
    this.block.analyze(blockContext);
  }

  get(context) {
    return this;
  }


}

module.exports = ForStatement;
