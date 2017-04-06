class VariableDeclaration {
  constructor(id, expression) {
    this.id = id;
    this.expression = expression;
  }

/* eslint-disable quotes */
  toString() {
    return `(VariableID = ${this.id.toString()}, Val : ${this.expression.toString()})`;
  }

  analyze(context) {
    this.expression.analyze(context);
    this.context.addVariable(this.id, this.expression);
  }
}
/* eslint-enable quotes */

module.exports = VariableDeclaration;
