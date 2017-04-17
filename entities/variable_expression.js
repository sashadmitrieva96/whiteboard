class VariableExpression {
  constructor(id) {
    this.key = id;
  }

  toString() {
    return `(VariableId : ${this.id.toString()})`;
  }

  analyze(context) {
    this.type = context.lookup(this.key).type;
    // this.value = context.lookup(this.key);
    // this = context.lookup(this.key);
    // Object.assign(this, context.lookup(this.key));
  }

  get(context) {
    console.log(this.key);
    console.log(context.lookup(this.key));
    return context.lookup(this.key).get(context);
  }

}

module.exports = VariableExpression;
