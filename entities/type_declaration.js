class TypeDeclaration{
  constructor(id, params, body) {
    this.id = id;
    this.params = params;
    this.body = body;
  }

  toString(){
    return `(${this.id} ${this.params.toString()} = ${this.body.toString()})`;
  }
}

module.exports = TypeDeclaration;
