class StringLiteral{
  constructor(value){
    this.value = value;
  }

  ToString() {
    return `(${this.value})`;
  }
}

module.exports = StringLiteral;
