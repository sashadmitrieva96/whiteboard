class Program {
  constructor(statements) {
    this.statements = statements;
  }

  toString() {
    let s = `{Program\n`;
    this.statements.forEach((x) => {
      s += x.toString() + '\n';
    });
    s+= "}";
    return s;
  }
}

module.exports = Program;
