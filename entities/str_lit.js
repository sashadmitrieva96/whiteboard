class StringLiteral {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return `StringLit : ${this.value}`;
  }

  analyze(context) {
    this.type = 'string';
  }
}

module.exports = StringLiteral;
