const TypeObject = require('./helpers/type_object');

class TypeDeclaration {
  constructor(id, params, block) {
    this.key = id;
    this.params = params;
    this.block = block;
    this.isType = true;
  }

  toString() {
    return `(TypeId : ${this.key} (TypeParams:= ${this.params.toString()}) (TypeBody : ${this.block.toString()}))`;
  }

  analyze(context) {
    context.addVariable(this.key, this);
    // console.log(context);
    this.closure = context.createChildContextForType();
    this.params.analyze(this.closure);
    this.block.analyze(this.closure);
    this.name = context.getName(this.key);
    this.type = new TypeObject([this.key]);
  }

  get() {
    return this;
  }

}

module.exports = TypeDeclaration;
