const Type = require('./type.js');

class BoolLiteral {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return `(BoolLit : ${this.value.toString()})`;
  }

  analyze(context) {
    this.type = Type.BOOL;
  }
}

module.exports = BoolLiteral;
