class VariableExpression {
  constructor(id) {
    this.id = id;
  }

  toString() {
    return `(VariableId : ${this.id.toString()})`;
  }

  analyze(context) {
    this.referent = context.lookup(this.id);
  }
}

module.exports = VariableExpression;
