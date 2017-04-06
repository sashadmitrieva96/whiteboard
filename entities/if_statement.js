const Type = require('./type.js');
const Case = require('./case.js');
const BoolLiteral = require('./bool_lit.js');
const util = require('util');

// this should concat the if and ei and el statements into 2 lists of exps and blocks

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

  toString() { // REDO THIS
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
    this.cases.forEach((c) => {
      c.analyze(context);
    });

    // this.ifExp.analyze(context.createChildContextForBlock());
    // Type.BOOL.assertTypeCompatability([this.ifExp]);
    // if (this.eiExps) {
    //   this.eiExps.forEach(eiBlocks => eiBlocks.analyze(context.createChildContextForBlock()));
    // }
    // console.log(this.eBlock);
    // if (this.eBlock.length !== 0) {
    //   this.eBlock.analyze(context.createChildContextForBlock());
    // }
  }
}

module.exports = IfStatement;
