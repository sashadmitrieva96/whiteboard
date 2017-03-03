class Program {
  constructor(statements) {
    this.statements = statements;
  }

  toString() {
    let s = `(Program `;
    this.statements.forEach((x) => {
      s += x +  " ";
    });
    s+= ")";
    return s;
  }

  // Maybe toString should be a list of Blocks?? or Statements??

}

module.exports = Program;
