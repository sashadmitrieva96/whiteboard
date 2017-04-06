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
    const context = new Context({});
    this.statements.forEach(s => s.analyze(context));
  }
}

module.exports = Program;
