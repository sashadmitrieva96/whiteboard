class Program {
  constructor(statements) {
    this.statements = statements;
    let s = `(Program `;
    this.statements.forEach((x) => {
      s += x.toString();
    });
    s+= ")";
  }

  toString() {
    let s = `(Program `;
    this.statements.forEach((x) => {
      s += x.toStrx ng();
    });
    s+= ")";
    return s;
  }
}

module.exports = Program;
