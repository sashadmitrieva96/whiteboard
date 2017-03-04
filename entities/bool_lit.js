class BoolLiteral{
  constructor(value){
    this.value = value;
  }

  toString() {
    return `(${this.value.toString()})`;
  }
}

module.exports = BoolLiteral;
