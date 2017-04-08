const Type = require('./type.js');

class Operand {
  constructor(op) {
    this.op = op;
  }

  toString() {
    return `${this.op}`;
  }

  argumentType() {
    const numberOps = ['>=', '>', '<=', '<', '+', '-', '*', '/', '%', 'mod', '**', '-'];

    const booleanOps = ['and', 'or', '!', 'not'];

    const anyOps = ['==', '!='];

    if (booleanOps.includes(this.op)) {
      return Type.Bool;
    } else if (numberOps.includes(this.op)) {
      return Type.Num;
    } else if (anyOps.includes(this.op)) {
      return Type.UNKNOWN;
    }
    throw Error(`unknown operand ${this.op}`);
  }

  resultType() {
    const numberOps = ['+', '-', '*', '/', '%', 'mod', '**', '-'];

    const booleanOps = ['>=', '>', '<=', '<', 'and', 'or', '!', 'not'];

    const anyOps = ['==', '!='];

    if (booleanOps.includes(this.op)) {
      return Type.Bool;
    } else if (numberOps.includes(this.op)) {
      return Type.Num;
    } else if (anyOps.includes(this.op)) {
      return Type.UNKNOWN;
    }
    throw Error(`unknown operand ${this.op}`);
  }
}

module.exports = Operand;
