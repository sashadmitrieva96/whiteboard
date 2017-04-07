const Context = require('./context.js');
const Type = require('./type.js');

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
    console.log(context);
    this.statements.forEach(s => s.analyze(context));
    // console.log(Type.typeList);
    // console.log(context);
  }
}

module.exports = Program;
