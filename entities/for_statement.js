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
    // console.log(this.id);
    localContext.addVariable(this.id, this);
    // console.log(this.exp);
    this.exp.analyze(localContext);
    this.block.analyze(localContext);
  }
}

module.exports = ForStatement;
