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
    context.addVariable(this.id, this);
    context.addType(this.id);
  }
}

module.exports = TypeDeclaration;
