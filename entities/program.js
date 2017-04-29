// const Context = require('./context.js');
const InitialContext = require('./helpers/initial_context.js');

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
    // console.log(require('util').inspect(context, { depth: null }));
    this.statements.forEach(s => s.analyze(context));
    return true;
  }

  get() {
    return this;
  }
}

module.exports = Program;
