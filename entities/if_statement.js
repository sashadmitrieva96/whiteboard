const Case = require('./case.js');
const BoolLiteral = require('./bool_lit.js');

class IfStatement {
  constructor(ifExp, ifBlock, eiExps, eiBlocks, eBlock) {
    this.cases = [];

    this.cases.push(new Case(ifExp, ifBlock));

    for (let i = 0; i < eiExps.length; i++) {
      this.cases.push(new Case(eiExps[i], eiBlocks[i]));
    }

    if (eBlock.length !== 0) {
      this.cases.push(new Case(new BoolLiteral('true'), eBlock[0]));
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
    this.cases.forEach((c) => {
      c.analyze(context);
    });
  }
}

module.exports = IfStatement;
