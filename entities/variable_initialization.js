
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
    context.lookup(this.type.type);
    if (this.expression) {
      this.expression.analyze(context);
      if (this.expression.resultType) {
        this.type.assertTypeCompatability(this.expression.resultType(context));
      } else {
        this.type.assertTypeCompatability(this.expression.type);
      }
    }

    context.addVariable(this.key, this);
    this.name = context.getName(this.key);
  }

  get(context) {
    return this.expression.get(context);
  }

}
/* eslint-enable quotes */

module.exports = VariableInitialization;
