class FunctionDeclaration {
  constructor(id, type, params, block) {
    this.type = type;
    this.id = id;
    this.params = params;
    this.block = block;
  }

  toString() {
    console.log(`(FunctionID : ${this.id.toString()}, Params : ${this.params.toString()}s`);
    return `(FunctionID : ${this.id.toString()}, Params : ${this.params.toString()}, Block : ${this.block.toString()})`;
  }
}

module.exports = FunctionDeclaration;
