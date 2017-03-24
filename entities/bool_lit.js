class BoolLiteral{
  constructor(value){
    this.value = value;
  }

  toString() {
    return `BoolLit : ${this.value.toString()}`;
  }
}

module.exports = BoolLiteral;
