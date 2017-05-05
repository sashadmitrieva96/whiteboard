// const Context = require('./context.js');
const InitialContext = require('./../backend/initial_context.js');

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
    const context = InitialContext;
    this.statements.forEach(s => s.analyze(context));
    return true;
  }

  optimize() {
    this.statements.optimize();
  }

  get() {
    return this;
  }
}

module.exports = Program;
