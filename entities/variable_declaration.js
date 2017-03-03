class VariableDeclaration{
  constructor(id, type, expression) {
    this.id = id;
    this.type = type;
    this.expression = expression;
  }

  toString(){
    return `(${this.type} ${this.id} = ${this.expression})`;
  }
}

module.exports = VariableDeclaration;
