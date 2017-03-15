class VariableDeclaration{
  constructor(id, type, expression) {
    this.id = id;
    this.type = type;
    this.expression = expression;
  }

  toString(){
    let str = `(VariableID = ${this.id.toString()}`

    if (this.type != undefined) {
      str = str + `, Type : ${this.type.toString()}`;
    }
    if (this.expression != undefined) {
      str = str + `, Type : ${this.expression.toString()}`;
    }
    str = str + ` )`;
    return str;
  }
}

module.exports = VariableDeclaration;
