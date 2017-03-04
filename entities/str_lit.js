class StringLiteral{
  constructor(value){
    this.value = value;
  }

  toString() {
    return `StringLit = ${this.value}`;
  }
}

module.exports = StringLiteral;
