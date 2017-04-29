class Binding {
  constructor(key, value) {
    this.key = key;
    this.expression = value;
    this.isBinding = true;
  }

  toString() {
    return `(Entry ${this.key.toString()}, ${this.expression.toString()})`;
  }

  analyze(context, assignmentContext) {
    this.expression.analyze(context);
    this.type = this.expression.type;
    if (assignmentContext) {
      assignmentContext.replace(this.key, this.expression);
      this.name = assignmentContext.getName(this.key);
    } else {
      context.addVariable(this.key, this.expression);
      this.name = context.getName(this.key);
    }
  }

  get(context) {
    return context.lookup(this.key).get(context);
  }


}

module.exports = Binding;
