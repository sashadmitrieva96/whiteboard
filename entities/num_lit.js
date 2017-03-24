class NumLiteral {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return `(NumLit : ${this.value})`;
  }
}

module.exports = NumLiteral;
