const Type = require('./type.js');
const TypeObject = require('./helpers/type_object.js');

const util = require('util');

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

  get(context) {
    return this;
  }

}

module.exports = StringLiteral;
