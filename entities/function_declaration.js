const Type = require('./type.js');
const TypeObject = require('./helpers/type_object.js');
const util = require('util');

class FunctionDeclaration {
  constructor(id, type, params, block) {
    this.type = type;
    this.key = id;
    this.params = params;
    this.block = block;
  }

  toString() {
    return `(FunctionID : ${this.id.toString()}, Params : ${this.params.toString()}, Block : ${this.block.toString()})`;
  }

  analyze(context) {

    // make sure the type exists

    this.closure = context.createChildContextForFunction();
    this.params.analyze(this.closure);
    this.block.analyze(this.closure);


    if (this.type !== '') {
      context.lookup(this.type);
      this.type = new TypeObject([this.type]);
      this.type.assertTypeCompatability(this.closure.type);
    } else {
      this.type = this.closure.type;
    }
    context.addVariable(this.key, this);
    this.isFunction = true;

    // console.log('FUN DECL:  ', util.inspect(context, { depth: null }));
  }

  get(context) {
    return this;
  }

}

module.exports = FunctionDeclaration;
