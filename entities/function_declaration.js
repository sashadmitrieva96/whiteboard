class FunctionDeclaration {
  constructor(type, id, params, block) {
    this.type = type;
    this.id = id;
    this.params = params;
    this.block = block;
  }

  toString() {
    return `(Function ${this.id} ${this.params}
            ${this.block} )`;
  }
}

module.exports = FunctionDeclaration;
