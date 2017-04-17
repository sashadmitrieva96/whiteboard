const TypeObject = require('./helpers/type_object.js');

class NumLiteral {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return `(NumLit : ${this.value})`;
  }

  analyze() {
    this.type = new TypeObject(['Num']);
  }

  get() {
    return this;
  }


}

module.exports = NumLiteral;
