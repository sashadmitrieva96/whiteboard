class Block {
  constructor(statements) {
    this.statements = statements;
  }

  toString() {
    let s = `(Block `;
    this.statements.forEach((x) => {
      s += x.toString() +  " ";
    });
    s+= ")";
    return s;
  }
}

module.exports = Block;
