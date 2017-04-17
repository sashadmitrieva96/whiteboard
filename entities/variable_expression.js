class VariableExpression {
  constructor(id) {
    this.key = id;
  }

  toString() {
    return `(VariableId : ${this.id.toString()})`;
  }

  analyze(context) {
    this.type = context.lookup(this.key).type;
  }

  get(context) {
    return context.lookup(this.key).get(context);
  }

}

module.exports = VariableExpression;
