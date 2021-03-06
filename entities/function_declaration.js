const Type = require('./type.js');

class FunctionDeclaration {
  constructor(id, type, params, block) {
    this.type = new Type(Type.Function.type, type);
    this.key = id;
    this.params = params;
    this.block = block;
  }

  toString() {
    return `(FunctionID : ${this.key.toString()}, Params : ${this.params.toString()}, Block : ${this.block.toString()})`;
  }

  analyze(context) {
    context.addVariable(this.key, this);
    this.closure = context.createChildContextForFunction();
    this.params.analyze(this.closure);
    this.block.analyze(this.closure, true);


    if (this.type !== '') {
      context.lookup(this.type.type);
      this.type.assertProducesType(this.closure.type);
    } else {
      this.type = this.closure.type;
    }
    this.name = context.getName(this.key);
    this.isFunction = true;
  }

  get() {
    return this;
  }

  optimize() {
    this.params = this.params.optimize();
    this.block = this.block.optimize();
    return this;
  }

}

module.exports = FunctionDeclaration;
