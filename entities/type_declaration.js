const Type = require('./type');

class TypeDeclaration {
  constructor(id, params, block, runtimeType) {
    this.key = id;
    this.params = params;
    this.block = block;
    this.isType = true;
    this.runtimeType = runtimeType;
  }

  toString() {
    return `(TypeId : ${this.key} (TypeParams:= ${this.params.toString()}) (TypeBody : ${this.block.toString()}))`;
  }

  analyze(context) {
    context.addVariable(this.key.type, this);

    this.closure = context.createChildContextForType();
    this.params.analyze(this.closure);
    this.block.analyze(this.closure);
    this.name = context.getName(this.key.type);
    this.type = new Type(Type.Type.type, this.key);
  }

  get() {
    return this;
  }

  optimize() {
    this.params.optimize();
    this.block.optimize();
  }

}

module.exports = TypeDeclaration;
