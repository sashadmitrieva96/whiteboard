class Block {
  constructor(statements) {
    this.statements = statements;
  }

  toString() {
    let s = `(Block `;
    this.statements.forEach((x) => {
      s += x +  " ";
    });
    s+= ")";
    return s;
  }
}

module.exports = Block;
