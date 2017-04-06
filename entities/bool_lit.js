const Type = require('./type.js');

class BoolLiteral {
  constructor(value) {
    this.value = value;
    this.type = Type.BOOL;
  }

  toString() {
    return `(BoolLit : ${this.value.toString()})`;
  }

  analyze() {
    this.type = Type.BOOL;
  }
}

module.exports = BoolLiteral;
