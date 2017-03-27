class Params {
  constructor(p1, parameter) {
    this.p1 = p1;
    this.parameter = parameter;
  }

  toString() {
    return this.parameter ? `(Param ${this.p1}${this.parameter})` : this.p1;
  }
}

module.exports = Params;
