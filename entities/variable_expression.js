class VariableExpression {
  constructor(id) {
    this.id = id;
  }

  toString() {
    return `(VariableId : ${this.id.toString()})`;
  }

  get(context) {
    console.log(context);
    return context.lookup(this.id);
  }

  analyze(context) {
    this.type = context.lookup(this.id).type;
  }
}

module.exports = VariableExpression;
