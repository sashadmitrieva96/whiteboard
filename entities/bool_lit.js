class BoolLiteral{
  constructor(value){
    this.value = value;
  }

  ToString() {
    return `(${this.value})`;
  }
}

module.exports = BoolLiteral;
