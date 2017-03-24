class TypeDeclaration {
  constructor(id, params, body) {
    this.id = id;
    this.params = params;
    this.body = body;
  }

  toString() {
    return `(TypeId : ${this.id} (TypeParams:= ${this.params.toString()}) (TypeBody : ${this.body.toString()}))`;
  }
}

module.exports = TypeDeclaration;
