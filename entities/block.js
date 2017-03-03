class Block {
  constructor(statement) {
    this.statement = statement;
  }

  toString() {
    let s = ``;
    this.statement.forEach((x) => {
      s += x + " ";
    });
    return s;
  }
}

module.exports = Block;
