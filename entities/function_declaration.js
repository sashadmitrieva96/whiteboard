const Type = require('./type.js');

class FunctionDeclaration {
  constructor(id, type, params, block) {
    this.type = type;
    this.id = id;
    this.params = params;
    this.block = block;
  }

  toString() {
    return `(FunctionID : ${this.id.toString()}, Params : ${this.params.toString()}, Block : ${this.block.toString()})`;
  }

  // FINISH THIS!
  analyze(context) {
    const localContext = context.createChildContextForFunction(this);
    // console.log(this.params);
    this.params.analyze(localContext);

    if (this.body) {
      this.body.forEach(s => s.analyze(localContext));
    }

    if (this.type) {
      localContext.type = this.type.analyze(context).type;
    } else {
      localContext.type = Type.UNKNOWN;
    }

    context.addVariable(this.id, this);
    console.log('function declared');
  }

}

module.exports = FunctionDeclaration;
