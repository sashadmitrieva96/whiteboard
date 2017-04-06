const Type = require('./type.js');

class BoolLiteral {
  constructor(value) {
    this.value = value;
    this.type = Type.Bool;
  }

  toString() {
    return `(BoolLit : ${this.value.toString()})`;
  }

  analyze() {
    this.type = Type.Bool;
  }
}

module.exports = BoolLiteral;
