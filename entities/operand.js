const Type = require('./type.js');

class Operand {
  constructor(op) {
    this.op = op;
  }

  toString() {
    return `${this.op}`
  }

  argumentType() {
    let numberOps = ['>=', '>', '<=', '<', '+', '-', '*', '/', '%', 'mod', '**', '-'];

    let booleanOps = ['and', 'or', '!=', '==', '!', 'not'];

    if (booleanOps.includes(this.op)) {
      return Type.BOOL;
    } else if (numberOps.includes(this.op)) {
      return Type.NUM;
    }
    throw Error(`unknown operand ${this.op}`);

  }

  resultType() {
    let numberOps = ['+', '-', '*', '/', '%', 'mod', '**', '-'];

    let booleanOps = ['>=', '>', '<=', '<', 'and', 'or', '!=', '==', '!', 'not'];

    if (booleanOps.includes(this.op)) {
      return Type.BOOL;
    } else if (numberOps.includes(this.op)) {
      return Type.NUM;
    }
    throw Error(`unknown operand ${this.op}`);
  }
}

module.exports = Operand;
