const TypeObject = require('./helpers/type_object');

class TypeDeclaration {
  constructor(id, params, block) {
    this.id = id;
    console.log(this.id);
    this.params = params;
    this.block = block;
    this.isType = true;
  }

  toString() {
    return `(TypeId : ${this.id} (TypeParams:= ${this.params.toString()}) (TypeBody : ${this.block.toString()}))`;
  }

  analyze(context) {
    this.closure = context.createChildContextForType();
    this.params.analyze(this.closure);
    this.block.analyze(this.closure);
    context.addVariable(this.id, this);
    this.type = new TypeObject([this.id]);
  }

  get() {
    return this;
  }

}

module.exports = TypeDeclaration;
