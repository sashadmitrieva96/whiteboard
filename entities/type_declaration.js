// const Type = require('./type.js');
const TypeObject = require('./helpers/type_object');
const util = require('util');

class TypeDeclaration {
  constructor(id, params, block) {
    // console.log('+++++++++    ' + id);
    this.id = id;
    this.params = params;
    this.block = block;
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

    // console.log(util.inspect(this.closure, { depth: null }));
  }

  get(context) {
    return this;
  }

}

module.exports = TypeDeclaration;
