class NumLiteral {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return `(NumLit : ${this.value})`;
  }

  analyze(context) {
    this.type = 'num';
  }
}

module.exports = NumLiteral;
