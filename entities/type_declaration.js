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
    this.block.analyze(context.createChildContextForBlock());
    this.params.analyze(context);
    this.context.addVariable(this.id, this.params);
  }
}

module.exports = TypeDeclaration;
