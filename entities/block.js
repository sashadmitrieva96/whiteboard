const Context = require('./context.js');

class Block {
  constructor(statements) {
    this.statements = statements;
  }

  analyze(context) {
    // console.log("...");
    this.statements.forEach(s => s.analyze(context));
  }

/* eslint-disable quotes */
  toString() {
    let s = `(Block`;
    this.statements.forEach((x) => {
      s = `${s} ${x.toString()}`;
    });
    s = `${s})`;
    // console.log(s);
    return s;
  }
}
/* eslint-enable quotes */

module.exports = Block;
