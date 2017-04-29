const Type = require('./type.js');

class FunctionDeclaration {
  constructor(id, type, params, block) {
    this.type = new Type(Type.Function.type, type);
    // console.log('Fun DECL: ', id, this.type);
    this.key = id;
    this.params = params;
    this.block = block;
  }

  toString() {
    return `(FunctionID : ${this.key.toString()}, Params : ${this.params.toString()}, Block : ${this.block.toString()})`;
  }

  analyze(context) {
    // RETURNS DONT PROPOGATE TYPE!! BUG CATCHER BATKEV AT IT AGAIN!!!!
    context.addVariable(this.key, this);
    this.closure = context.createChildContextForFunction();
    this.params.analyze(this.closure);
    this.block.analyze(this.closure);


    if (this.type !== '') {
      // console.log('fun');
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

}

module.exports = FunctionDeclaration;
