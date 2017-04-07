const Type = require('./type.js');

class VariableInitialization {
  constructor(id, type, expression) {
    this.id = id;
    this.type = type;
    this.expression = expression[0];
  }

/* eslint-disable quotes */
  toString() {
    let str = `(VariableID = ${this.id.toString()}`;
    if (this.type) {
      str += `, Type : ${this.type.toString()}`;
    }
    if (this.expression) {
      str += `, Val : ${this.expression.toString()}`;
    }
    str += `)`;
    return str;
  }

  analyze(context) {
    if (!this.type) {
      this.type = Type.UNKNOWN;
    }
    if (this.expression) {
      this.expression.analyze(context);
      this.type.assertTypeCompatability([this.expression.type], `declared Type ${this.type} does not match expression type ${this.expression.type}`);
    }
    context.addVariable(this.id, this);
  }
}
/* eslint-enable quotes */

module.exports = VariableInitialization;
