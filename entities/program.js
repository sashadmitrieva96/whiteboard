const Context = require('./context.js');

class Program {
  constructor(statements) {
    this.statements = statements;
  }

  analyze() {
    this.statements.forEach(s => s.analyze(context.INITIAL));
  }

  toString() {
    let s = '{ Program ';
    this.statements.forEach((x) => {
      s += x.toString();
    });
    s += '}';
    return s;
  }
}

module.exports = Program;
