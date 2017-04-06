class FunctionDeclaration {
  constructor(id, type, params, block) {
    this.type = type;
    this.id = id;
    this.params = params;
    this.block = block;
  }

  toString() {
    return `(FunctionID : ${this.id.toString()}, Params : ${this.params.toString()}, Block : ${this.block.toString()})`;
  }

  // FINISH THIS!
  analyze(context) {
    const localContext = context.createChildContextForFunction(this);
    this.params.forEach(p => p.analyze(localContext));
    this.params.forEach(p => p.add(this.id));
    if (this.body) {
      this.body.forEach(s => s.analyze(localContext));
    }
  }
}

module.exports = FunctionDeclaration;
