const VariableInitialization = require('./variable_initialization.js');
const Type = require('./type.js');

class ForStatement {
  constructor(id, exp, block) {
    this.id = id;
    this.expression = exp;
    this.block = block;
  }

  toString() {
    return `(for ${this.id} in ${this.expression.toString()} {${this.block.toString()}})`;
  }

  analyze(context) {
    this.closure = context.createChildContextForLoop();
    this.expression.analyze(this.closure);

    this.thing = new VariableInitialization(this.id, Type.Arbritrary, null);

    this.thing.analyze(this.closure);
    this.block.analyze(this.closure);
  }

  get() {
    return this;
  }

  optimize() {
    this.exp = this.exp.optimize();
    this.block = this.block.optimize();
    return this;
  }


}

module.exports = ForStatement;
