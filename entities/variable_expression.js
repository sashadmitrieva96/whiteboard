class VariableExpression {
    constructor(id) {
      this.id = id;
    }

    toString() {
      return `(${this.id.toString()})`;
    }
}

module.exports = VariableExpression;
