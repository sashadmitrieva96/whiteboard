class Block {
  constructor(statements) {
    this.statements = statements;
  }

  analyze() {
    this.statements.forEach(s => s.analyze(new Context()));
  }

/* eslint-disable quotes */
  toString() {
    let s = `(Block `;
    this.statements.forEach((x) => {
      s = `${s} ${x.toString()}`;
    });
    s = `${s})`;
    return s;
  }
}
/* eslint-enable quotes */

module.exports = Block;
