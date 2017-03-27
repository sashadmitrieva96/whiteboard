class TypeDeclaration {
  constructor(id, params, block) {
    this.id = id;
    this.params = params;
    this.block = block;
  }

  toString() {
    console.log(this.block);
    console.log(" ");
    return `(TypeId : ${this.id} (TypeParams:= ${this.params.toString()}) (TypeBody : ${this.block.toString()}))`;
  }
}

module.exports = TypeDeclaration;
