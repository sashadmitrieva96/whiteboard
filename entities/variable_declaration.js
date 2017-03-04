class VariableDeclaration{
  constructor(id, type, expression) {
    this.id = id;
    this.type = type;
    this.expression = expression;
  }

  toString(){
    return `(VariableID = '${this.id.toString()}', Type = '${this.type.toString()}',  Value = ${this.expression.toString()})`;
  }
}

module.exports = VariableDeclaration;
