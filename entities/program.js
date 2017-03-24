const Context = require('./context.js');

class Program {
  constructor(statements) {
    this.statements = statements;
  }

  analyze() {
    this.statements.forEach(s => s.analyze(new Context()));
  }

/* eslint-disable quotes */
  toString() {
    let s = `{ Program `;
    this.statements.forEach((x) => {
      s += x.toString();
    });
    s += '}';
    return s;
  }
}
/* eslint-disable quotes */

module.exports = Program;
