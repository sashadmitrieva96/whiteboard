class VariableExpression {
  constructor(id) {
    this.key = id;
  }

  toString() {
    return `(VariableId : ${this.key.toString()})`;
  }

  analyze(context) {
    const res = context.lookup(this.key);
    this.type = res.type;
    this.isType = res.isType;
  }

  get(context) {
    return context.lookup(this.key).get(context);
  }

}

module.exports = VariableExpression;
