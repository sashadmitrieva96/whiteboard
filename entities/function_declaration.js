class FunctionDeclaration {
  constructor(type, id, params, block) {
    this.type = type;
    this.id = id;
    this.params = params;
    this.block = block;
  }

  toString() {
    return `(FunctionID = ${this.id} TypeParams = ${this.params.toString()},
            Block = ${this.block.toString()} )`;
  }
}

module.exports = FunctionDeclaration;
