const VariableInitialization = require('./variable_initialization.js');
const Type = require('./type.js');

class ForStatement {
  constructor(id, exp, block) {
    this.id = id;
    this.expression = exp;
    this.block = block;
  }

  toString() {
    return `(for ${this.id} in ${this.exp.toString()} {${this.block.toString()}})`;
  }

  analyze(context) {
    // console.log(this.id);
    this.closure = context.createChildContextForLoop();
    this.expression.analyze(this.closure);

    this.thing = new VariableInitialization(this.id, Type.Arbritrary, null);

    // this.closure.addVariable(this.id, this.expression);
    this.thing.analyze(this.closure);
    // console.log(require('util').inspect(this.block.statements[0], { depth: null }));
    this.block.analyze(this.closure);
    // console.log(this.closure);
  }

  get() {
    return this;
  }


}

module.exports = ForStatement;
