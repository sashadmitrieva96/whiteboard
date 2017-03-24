class VariableExpression {
  constructor(id) {
    this.id = id;
  }

  toString() {
    return `VariableId : ${this.id.toString()}`;
  }
}

module.exports = VariableExpression;
