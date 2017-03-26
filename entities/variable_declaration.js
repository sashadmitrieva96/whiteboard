class VariableDeclaration {
  constructor(id, expression) {
    this.id = id;
    this.expression = expression;
  }

/* eslint-disable quotes */
  toString() {
    return `(VariableID = ${this.id.toString()}, Val : ${this.expression.toString()})`;
  }
}
/* eslint-enable quotes */

module.exports = VariableDeclaration;
