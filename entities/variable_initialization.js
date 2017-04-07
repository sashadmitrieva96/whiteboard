const Type = require('./type.js');
const util = require('util');

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
    // console.log(Type);
    if (!this.type) {
      this.type = Type.UNKNOWN;
    }
    console.log("exp in init: " + this.expression);
    if (this.expression) {
      this.expression.analyze(context);
      console.log("exp in init after anlyz: ", this.expression);
      console.log("~~~" + this.expression.type);
      console.log("~~~" + this.type);
      this.type.assertTypeCompatability([this.expression.type], `declared Type ${this.type} does not match expression type ${this.expression.type}`);
    }

    console.log("+++++++++  " + util.inspect(this.expression, {depth: null}));
    // console.log(this.type);
    context.addVariable(this.id, this);
  }
}
/* eslint-enable quotes */

module.exports = VariableInitialization;
