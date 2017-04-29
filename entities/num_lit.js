const Type = require('./type.js');

class NumLiteral {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return `(NumLit : ${this.value})`;
  }

  analyze() {
    this.type = Type.Num;
  }

  get() {
    return this;
  }


}

module.exports = NumLiteral;
