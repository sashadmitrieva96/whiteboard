class BoolLiteral{
  constructor(value){
    this.value = value;
  }

  toString() {
    return `(${this.value})`;
  }
}

module.exports = BoolLiteral;
