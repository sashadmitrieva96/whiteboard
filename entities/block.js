class Block {
  constructor(statements) {
    this.statements = statements;
  }

  toString() {
    let s = `(Block `;
    this.statements.forEach((x) => {
      s = `${s} ${x.toString()}`;
    });
    s =  `${s})`;
    return s;
  }
}

module.exports = Block;
