class VariableAssignment {
  constructor(id, expression) {
    this.key = id;
    this.expression = expression;
  }

  analyze(context) {
    this.expression.analyze(context);

    if (this.expression.resultType) {
      this.type = this.expression.resultType(context);
    } else {
      this.type = this.expression.type;
    }
    this.type.assertTypeCompatability(context.lookup(this.key).type);
    this.name = context.lookup(this.key).name;
    context.replace(this.key, this);
  }

  get(context) {
    return this.expression.get(context);
  }
}

module.exports = VariableAssignment;
