class TypeDeclaration{
  constructor(id, params, body) {
    this.id = id;
    this.params = params;
    this.body = body;
  }

  ToString(){
    return `(${this.id} ${this.params} = ${this.body})`;
  }
}

module.exports = TypeDeclaration;
