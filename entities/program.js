class Program {
  constructor(statements) {
    this.statements = statements;
  }

  toString() {
    let s = `{ Program `;
    this.statements.forEach((x) => {
      s += x.toString();
    });
    s+= "\n }";
    return s;
  }
}

module.exports = Program;
