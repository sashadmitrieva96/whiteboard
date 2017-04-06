const Context = require('./context.js');

class Program {
  constructor(statements) {
    this.statements = statements;
  }

  toString() {
    let s = '{ Program ';
    this.statements.forEach((x) => {
      s += x.toString();
    });
    s += '}';
    return s;
  }

  analyze() {
    this.statements.forEach(s => s.analyze(new Context({})));
  }
}

module.exports = Program;
