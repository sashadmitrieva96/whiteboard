const Case = require('./case.js');
const BoolLiteral = require('./bool_lit.js');

class IfStatement {
  constructor(ifExp, ifBlock, eiExps, eiBlocks, eBlock) {
    this.cases = [];

    this.cases.push(new Case(ifExp, ifBlock));

    for (let i = 0; i < eiExps.length; i++) {
      this.cases.push(new Case(eiExps[i], eiBlocks[i]));
    }

    if (eBlock) {
      this.cases.push(new Case(new BoolLiteral('true'), eBlock));
      this.cases[this.cases.length - 1].isElse = true;
    }
  }

  toString() {
    let str = 'If (';
    this.cases.forEach((x) => {
      str += x.toString();
      str += ' ';
    });
    str += ')';

    return str;
  }

  analyze(context) {
    const blockContext = context.createChildContextForBlock();
    this.cases.forEach((c) => {
      c.analyze(blockContext);
    });
  }

  get() {
    return this;
  }

}

module.exports = IfStatement;
