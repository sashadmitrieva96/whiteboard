class Block {
  constructor(statements) {
    this.statements = statements;
  }


/* eslint-disable quotes */
  toString() {
    let s = `(Block`;
    this.statements.forEach((x) => {
      s = `${s} ${x.toString()}`;
    });
    s = `${s})`;
    return s;
  }

  analyze(context) {
    this.statements.forEach(s => s.analyze(context));
  }

  get(context) {
    return this;
  }
}
/* eslint-enable quotes */

module.exports = Block;
