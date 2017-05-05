const Type = require('./type.js');

class BoolLiteral {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return `(BoolLit : ${this.value.toString()})`;
  }

  analyze() {
    this.type = Type.Bool;
  }

  get() {
    return this;
  }

  optimize() {
    return this;
  }

  opposite() {
    if (this.value === 'false') {
      return new BoolLiteral('true');
    }
    return new BoolLiteral('false');
  }

}

module.exports = BoolLiteral;
