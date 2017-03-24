class VariableDeclaration {
  constructor(id, type, expression) {
    this.id = id;
    this.type = type;
    this.expression = expression;
  }

/* eslint-disable quotes */
  toString() {
    let str = `(VariableID = ${this.id.toString()}`;

    if (this.type !== undefined) {
      str += `, Type : ${this.type.toString()}`;
    }
    if (this.expression !== undefined) {
      str += `, Type : ${this.expression.toString()}`;
    }
    str += ` )`;
    return str;
  }
}
/* eslint-enable quotes */

module.exports = VariableDeclaration;
