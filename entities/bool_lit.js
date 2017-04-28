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

  get() {
    return this;
  }

}

module.exports = BoolLiteral;
