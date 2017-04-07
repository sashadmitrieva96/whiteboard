const Type = require('./type.js');
const util = require('util');

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

    console.log("MMMMMMMMM   " + this.type.type.length);
    if (this.type.type.length !== 0) {
      localContext.type = this.type;
    } else {
      localContext.type = Type.UNKNOWN;
      console.log("NO DECLARED TYPE FOR FUNCTIOn");
    }
    console.log('          ' + util.inspect(localContext));
    this.block.analyze(localContext);
    this.type = localContext.type;


    context.addVariable(this.id, this);
    console.log(this.params.analyze(context));
    console.log('function declared');
  }

}

module.exports = FunctionDeclaration;
