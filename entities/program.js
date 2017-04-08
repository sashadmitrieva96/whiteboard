const Context = require('./context.js');
const util = require('util');

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
    const context = Context.INITIAL();
    // console.log(context);
    this.statements.forEach((s) => {
      // console.log(util.inspect(context, { depth: null }));
      s.analyze(context);
    });
    // console.log(util.inspect(context, { depth: null }));
    return true;
    // console.log(Type.typeList);
    // console.log(context);
    // return true;
  }
}

module.exports = Program;
