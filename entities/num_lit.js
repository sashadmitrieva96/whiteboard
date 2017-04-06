const Type = require('./type.js');

class NumLiteral {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return `(NumLit : ${this.value})`;
  }

  analyze(context) {
    this.type = Type.NUM;
  }
}

module.exports = NumLiteral;
