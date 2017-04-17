const Type = require('./type.js');
const TypeObject = require('./helpers/type_object.js');

class BoolLiteral {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return `(BoolLit : ${this.value.toString()})`;
  }

  analyze() {
    this.type = new TypeObject(['Bool']);
  }

  get(context) {
    return this;
  }

}

module.exports = BoolLiteral;
