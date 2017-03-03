// NOT DONE

class IfStatement {
  constructor(ifExp, ifBlock, eiExps, eiBlocks, eExp, eBlock) {
    this.ifExp = ifExp;
    this.ifBlock = ifBlock;
    this.eiExps = eiExps;
    this.eiBlocks = eiBlocks;
    this.eBlock = eBlock;
  }

  toString() {
    let str = `( If (Case ${this.ifExp} Block ${this.ifBlock})`;
    for (let i = 0; i < this.eiExps.length;  ) {
        str = str + `( If (Case ${this.eiExps[i]} Block ${this.eiBlocks[0]})`
    }
    str = str + `( If (Case (true = true) Block ${this.eBlock})`


    return str;
  }
}

module.exports = IfStatement;
