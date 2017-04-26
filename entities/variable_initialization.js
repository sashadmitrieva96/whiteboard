const TypeObject = require('./helpers/type_object.js');

class VariableInitialization {
  constructor(id, type, expression) {
    this.key = id;
    this.type = type;
    this.expression = expression;
  }

/* eslint-disable quotes */
  toString() {
    let str = `(VariableID = ${this.key.toString()}`;
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
    context.lookup(this.type);
    this.type = new TypeObject([this.type]);
    if (this.expression) {
      this.expression.analyze(context);
      this.type.assertTypeCompatability(this.expression.type);
    }

    context.addVariable(this.key, this);
  }

  get(context) {
    return this.expression.get(context);
  }

}
/* eslint-enable quotes */

module.exports = VariableInitialization;
