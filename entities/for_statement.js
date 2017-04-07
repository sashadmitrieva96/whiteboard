class ForStatement {
  constructor(id, exp, block) {
    this.id = id;
    this.exp = exp;
    this.block = block;
  }

  toString() {
    return `(for ${this.id} in ${this.exp.toString()} {${this.block.toString()}})`;
  }

  analyze(context) {
    const localContext = context.createChildContextForLoop(this);
    localContext.addVariable(this.id);
    this.exp.forEach(p => p.analyze(localContext));
    this.block.forEach(s => s.analyze(localContext));
  }
}

module.exports = ForStatement;
