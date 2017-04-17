class Binding {
  constructor(key, value) {
    this.key = key;
    this.expression = value;
    this.isBinding = true;
  }

  toString() {
    return `(Entry ${this.key.toString()}, ${this.expression.toString()})`;
  }

  analyze(context) {
    this.expression.analyze(context);
    this.type = this.expression.type;
    context.addVariable(this.key, this.expression);
  }

  get(context) {
    return context.lookup(this.key);
  }


}

module.exports = Binding;
