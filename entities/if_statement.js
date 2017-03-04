// NOT DONE

class IfStatement {
  constructor(ifExp, ifBlock, eiExps, eiBlocks, eBlock) {
    this.ifExp = ifExp;
    this.ifBlock = ifBlock;
    this.eiExps = eiExps;
    this.eiBlocks = eiBlocks;
    this.eBlock = eBlock;
  }

  toString() {
    let str = `(If (Case ${this.ifExp}) \n (IfBlock ${this.ifBlock})) \n`;

    for (let i = 0; i < this.eiExps.length;  ) {
        str = str + `(ElseIf (Case ${this.eiExps[i]} \n ElseIfBlock ${this.eiBlocks[0]})`
    }
    if (this.eBlock.length != 0) {
      str = str + `(ElseBlock ${this.eBlock})`
    }
    return str;
  }
}

module.exports = IfStatement;
