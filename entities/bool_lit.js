const Type = require('./type.js');

class BoolLiteral {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return `(BoolLit : ${this.value.toString()})`;
  }

  analyze() {
    this.type = Type.Bool;
  }

  get() {
    return this;
  }

}

module.exports = BoolLiteral;
