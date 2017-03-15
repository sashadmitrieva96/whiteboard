class BoolLiteral{
  constructor(value){
    this.value = value;
  }

  toString() {
    return `Bool : ${this.value.toString()}`;
  }
}

module.exports = BoolLiteral;
