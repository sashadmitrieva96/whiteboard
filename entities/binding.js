class Binding {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `(Entry ${this.key.toString()}, ${this.value.toString()})`;
  }

  analyze(context) {
    // console.log('1.) ', this);
    this.value.analyze(context);
    this.key.analyze(context);
    // console.log('2.) ', this);
    this.type = this.value.type;
    // this.expression.analyze(context);
    context.addVariable(this.id, this);
  }
}

module.exports = Binding;
