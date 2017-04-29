const Type = require('./type.js');

class StringLiteral {
  constructor(value) {
    this.value = value.substring(1, value.length - 1);
  }

  toString() {
    return `StringLit : ${this.value}`;
  }

  analyze() {
    this.type = Type.Str;
  }

  get() {
    return this;
  }

}

module.exports = StringLiteral;
