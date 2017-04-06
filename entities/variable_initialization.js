const Type = require('./type.js');

class VariableInitialization {
  constructor(id, type, expression) {
    this.id = id;
    this.type = type;
    this.expression = expression;
  }

/* eslint-disable quotes */
  toString() {
    let str = `(VariableID = ${this.id.toString()}`;
    if (this.type.length !== 0) {
      str += `, Type : ${this.type.toString()}`;
    }
    if (this.expression.length !== 0) {
      str += `, Val : ${this.expression.toString()}`;
    }
    str += `)`;
    return str;
  }

  analyze(context) {
    if (this.type) {
      this.type = this.type.analyze(context).type;
    } else {
      this.type = Type.UNKNOWN;
    }

    this.expression.analyze(context);
    context.addVariable(this.id, this);
  }
}
/* eslint-enable quotes */

module.exports = VariableInitialization;
