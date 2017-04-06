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
    if (this.id.length !== this.expression.length) {
      throw new Error('Number of variables does not equal number of initializers');
    }
    this.expression.forEach(e => e.analyze(context));
    this.variables = this.id.map(id => new VariableDeclaration(id));
    this.variables.forEach(variable => context.addVariable(variable));
  }
}
/* eslint-enable quotes */

module.exports = VariableDeclaration;
