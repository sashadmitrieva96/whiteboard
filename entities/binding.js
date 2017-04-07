// const Type = require('./type.js');

class Binding {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `(Entry ${this.key.toString()}, ${this.value.toString()})`;
  }

  analyze(context) {
    this.type = this.value.analyze(context).type;

    this.expression.analyze(context);
    context.addVariable(this.id, this);
  }
}

module.exports = Binding;
