const Type = require('./type.js');

class StringLiteral {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return `StringLit : ${this.value}`;
  }

  analyze() {
    this.type = Type.STR;
  }
}

module.exports = StringLiteral;
