class VariableInitialization {
  constructor(id, type, expression) {
    this.id = id;
    this.type = type;
    this.expression = expression;
  }

/* eslint-disable quotes */
  toString() {
    let str = `(VariableID = ${this.id.toString()}`;
    if (this.type.length !== undefined) {
      str += `, Type : ${this.type.toString()}`;
    }
    if (this.expression.length !== 0) {
      str += `, Val : ${this.expression.toString()}`;
    }
    str += `)`;
    return str;
  }
}
/* eslint-enable quotes */

module.exports = VariableInitialization;
