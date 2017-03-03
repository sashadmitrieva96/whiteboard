class Block {
  constructor(statement) {
    this.statement = statement;
  }

  toString() {
    return `(Block ${this.statement})`;
  }

  // Maybe Block toString should be a list of Statements?
}

module.exports = Block;
