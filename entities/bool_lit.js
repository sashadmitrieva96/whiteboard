class BoolLiteral {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return `(BoolLit : ${this.value.toString()})`;
  }

  analyze(context) {
    this.type = 'bool';
  }
}

module.exports = BoolLiteral;
