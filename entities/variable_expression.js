class VariableExpression {
  constructor(id) {
    this.id = id;
  }

  toString() {
    return `(VariableId : ${this.id.toString()})`;
  }

  analyze(context) {
    this.type = context.lookup(this.id).type;
  }
}

module.exports = VariableExpression;
