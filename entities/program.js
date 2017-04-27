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
    const context = Context.INITIAL;
    this.statements.forEach(s => s.analyze(context));
    return true;
  }

  get() {
    return this;
  }
}

module.exports = Program;
