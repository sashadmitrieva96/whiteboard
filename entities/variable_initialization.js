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
    // console.log("init");
    if (!this.type) {
      this.type = Type.UNKNOWN;
    } else {
      // console.log(Type);
      // console.log(this.type);
      this.type = Type[this.type.type];
    }
    // console.log(this.type);
    // console.log(this.expression);
    if (this.expression) {
      this.expression.analyze(context);
      this.type.assertTypeCompatability([this.expression.type], `declared Type ${this.type} does not match expression type ${this.expression.type}`);
    }
    // console.log(this.type);
    context.addVariable(this.id, this);
  }
}
/* eslint-enable quotes */

module.exports = VariableInitialization;
