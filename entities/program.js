class Program {
  constructor(block) {
    this.block = block;
  }

  toString() {
    return `(Program ${this.block})`;
  }

  // Maybe toString should be a list of Blocks?? or Statements??

}

module.exports = Program;
