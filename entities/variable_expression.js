class VariableExpression {
  constructor(id) {
    this.key = id;
  }

  toString() {
    return `(VariableId : ${this.key.toString()})`;
  }

  analyze(context) {
    // console.log('****', require('util').inspect(context, { depth: null }));
    // console.log(this.key);
    const res = context.lookup(this.key);
    this.type = res.type;
    this.isType = res.isType;
    this.name = context.getName(this.key);
  }

  get(context) {
    return context.lookup(this.key).get(context);
  }

}

module.exports = VariableExpression;
