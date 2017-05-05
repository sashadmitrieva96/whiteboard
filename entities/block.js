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

  get() {
    return this;
  }

  optimize() {
    let end = this.statements.length - 2;
    this.statements.forEach((s, i) => {
      s = s.optimize();
      if (s.isReturn || s.isBreak) {
        end = i;
      }
    });
    this.statements = this.statements.slice(0, end + 1);
    return this;
  }
}
/* eslint-enable quotes */

module.exports = Block;
