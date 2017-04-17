const TypeObject = require('./helpers/type_object.js');

class StringLiteral {
  constructor(value) {
    this.value = value.substring(1, value.length - 1);
  }

  toString() {
    return `StringLit : ${this.value}`;
  }

  analyze() {
    this.type = new TypeObject(['Str']);
  }

  get() {
    return this;
  }

}

module.exports = StringLiteral;
