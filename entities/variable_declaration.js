class VariableDeclaration{
  constructor(id, type, expression) {
    this.id = id;
    this.type = type;
    this.expression = expression;
    console.log(id);
    console.log(type);
    console.log(expression);
  }

  toString(){
    return `(${this.type.toString()} ${this.id.toString()} = ${this.expression.toString()})`;
  }
}

module.exports = VariableDeclaration;
