class ForStatement{
  constructor(id, exp, block) {
    this.id = id;
    this.exp = exp;
    this.block = block;
  }

  toString(){
    return `(for ${this.id} in ${this.exp} {${this.block}})`;
  }
}

module.exports = ForStatement;
