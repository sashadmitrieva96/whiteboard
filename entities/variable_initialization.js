// const Type = require('./type.js');
// const util = require('util');

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
    // console.log('******' + util.inspect(this.type, { depth: null }));

    if (this.expression) {
      // console.log(this.expression);
      this.expression.analyze(context);
      this.type.assertTypeCompatability([this.expression.type], `declared Type ${this.type} does not match expression type ${this.expression.type}`);
    }
    context.addVariable(this.id, this);
    // console.log(util.inspect(context, { depth: null }));
  }
}
/* eslint-enable quotes */

module.exports = VariableInitialization;
