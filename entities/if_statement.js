class IfStatement {
  constructor(ifExp, ifBlock, eiExps, eiBlocks, eBlock) {
    this.ifExp = ifExp;
    this.ifBlock = ifBlock;
    this.eiExps = eiExps;
    this.eiBlocks = eiBlocks;
    this.eBlock = eBlock;
  }

  toString() {
    let str = `(If (Case ${this.ifExp})(IfBlock ${this.ifBlock}))`;

    for (let i = 0; i < this.eiExps.length; i++) {
      str += `(ElseIf (Case ${this.eiExps[i]})(ElseIfBlock ${this.eiBlocks[i]})`;
    }
    if (this.eBlock.length !== 0) {
      str += `(ElseBlock ${this.eBlock})`;
    }
    return str;
  }

  analyze(context) {
    this.ifExp.forEach(ifBlock => ifBlock.analyze(context.createChildContextForBlock()));
    if (this.eiExps) {
      this.eiExps.forEach(eiBlocks => eiBlocks.analyze(context.createChildContextForBlock()));
    } if (this.eBlock) {
      this.eBlock.analyze(context.createChildContextForBlock());
    }
  }
}

module.exports = IfStatement;
