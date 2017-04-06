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
    const blockContext = context.createChildContextForBlock();
    this.params.analyze(blockContext);
    this.block.analyze(blockContext);
    this.context.addVariable(this.id, this);
  }
}

module.exports = TypeDeclaration;
