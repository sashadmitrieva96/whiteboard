const Type = require('./type.js');

class TypeDeclaration {
  constructor(id, params, block) {
    this.id = id;
    this.params = params;
    this.block = block;
  }

  toString() {
    return `(TypeId : ${this.id} (TypeParams:= ${this.params.toString()}) (TypeBody : ${this.block.toString()}))`;
  }

  analyze(context) {
    // add id to Type
    const blockContext = context.createChildContextForBlock();
    this.params.analyze(blockContext);
    this.block.analyze(blockContext);
    // console.log(this);
    context.addVariable(this.id, this);
    // console.log("------" + context);
    context.addType(this.id);
    this.closure = blockContext;
    // this.type = Type.lookupType(this.id);
    // console.log(context);
  }
}

module.exports = TypeDeclaration;
