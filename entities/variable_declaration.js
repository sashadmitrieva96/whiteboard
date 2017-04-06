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
    // console.log("varDec");
    this.expression.analyze(context);
    this.type = this.expression.type;
    // console.log(this.type);
    context.addVariable(this.id, this);
  }
}
/* eslint-enable quotes */

module.exports = VariableDeclaration;
